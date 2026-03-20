import { cookies } from "next/headers";

import { settingsInputSchema } from "@/lib/validation/settings";

export type AppTheme = "light" | "dark" | "system";
export const THEME_STORAGE_KEY = "javiss-theme";

const SETTINGS_COOKIE_KEY = "javiss-demo-settings";

export async function getServerThemePreference(): Promise<AppTheme> {
  const store = await cookies();
  const raw = store.get(SETTINGS_COOKIE_KEY)?.value;

  if (!raw) {
    return "system";
  }

  try {
    const parsed = settingsInputSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data.theme : "system";
  } catch {
    return "system";
  }
}

export function getThemeBootstrapScript(preference: AppTheme) {
  return `
    (() => {
      const root = document.documentElement;
      const stored = window.localStorage.getItem("${THEME_STORAGE_KEY}") || ${JSON.stringify(preference)};
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const apply = (nextTheme) => {
        const resolved = nextTheme === "system" ? (media.matches ? "dark" : "light") : nextTheme;
        root.dataset.theme = nextTheme;
        root.classList.toggle("dark", resolved === "dark");
      };
      apply(stored);
      media.addEventListener("change", () => {
        const current = window.localStorage.getItem("${THEME_STORAGE_KEY}") || stored;
        if (current === "system") {
          apply("system");
        }
      });
    })();
  `;
}

export function resolveThemePreference(preference: AppTheme) {
  if (typeof window === "undefined") {
    return preference === "dark" ? "dark" : "light";
  }

  if (preference === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return preference;
}

export function applyThemePreference(preference: AppTheme) {
  if (typeof window === "undefined") {
    return;
  }

  const root = window.document.documentElement;
  const resolved = resolveThemePreference(preference);

  window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  root.dataset.theme = preference;
  root.classList.toggle("dark", resolved === "dark");
}
