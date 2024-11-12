export const locales = ["en", "kr"] as const;
export type Locale = (typeof locales)[number];