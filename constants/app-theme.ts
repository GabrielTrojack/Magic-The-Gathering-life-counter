export type AppThemeName = "night" | "day";

export type AppTheme = {
  name: AppThemeName;
  backgroundGradient: [string, string];
  sunColor: string;
  sunGlow: string;
  textPrimary: string;
  textSecondary: string;
  panel: string;
  panelBorder: string;
  divider: string;
  positive: string;
  negative: string;
  poison: string;
  poisonButtonBg: string;
  menuIcon: string;
  menuSeparator: string;
  modalBackdrop: string;
};

export const THEMES: Record<AppThemeName, AppTheme> = {
  night: {
    name: "night",
    backgroundGradient: ["#0f172a", "#111827"],
    sunColor: "#1f2937",
    sunGlow: "rgba(255,255,255,0.04)",
    textPrimary: "#f8fafc",
    textSecondary: "#cbd5e1",
    panel: "rgba(15,23,42,0.95)",
    panelBorder: "#334155",
    divider: "#1e293b",
    positive: "#16a34a",
    negative: "#dc2626",
    poison: "#22ff00",
    poisonButtonBg: "#000000",
    menuIcon: "#e2e8f0",
    menuSeparator: "#334155",
    modalBackdrop: "rgba(0, 0, 0, 0.55)",
  },
  day: {
    name: "day",
    backgroundGradient: ["#E6F4FF", "#FFE8A3"],
    sunColor: "#FFE08A",
    sunGlow: "rgba(255, 218, 121, 0.45)",
    textPrimary: "#111827",
    textSecondary: "#1f2937",
    panel: "rgba(255,255,255,0.72)",
    panelBorder: "rgba(17,24,39,0.12)",
    divider: "rgba(17,24,39,0.18)",
    positive: "#2f9e44",
    negative: "#d9480f",
    poison: "#2b8a3e",
    poisonButtonBg: "rgba(17,24,39,0.92)",
    menuIcon: "#111827",
    menuSeparator: "rgba(17,24,39,0.25)",
    modalBackdrop: "rgba(17,24,39,0.35)",
  },
};
