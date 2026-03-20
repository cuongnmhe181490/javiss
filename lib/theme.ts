import { cookies } from "next/headers";

import { settingsInputSchema } from "@/lib/validation/settings";

export type AppTheme = "light" | "dark" | "system";

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
      const stored = ${JSON.stringify(preference)};
      const resolved = stored === "system"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : stored;
      root.dataset.theme = stored;
      root.classList.toggle("dark", resolved === "dark");
    })();
  `;
}
