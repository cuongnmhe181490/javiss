export type AppTheme = "light" | "dark" | "system";
export const THEME_STORAGE_KEY = "javiss-theme";

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
