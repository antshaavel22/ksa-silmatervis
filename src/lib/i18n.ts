/**
 * Internationalization (i18n) Configuration
 * Language context for EST / RU / EN toggle
 * Global language preference stored in localStorage
 */

export type Language = "en" | "est" | "ru";

export const LANGUAGES: Record<Language, string> = {
  en: "English",
  est: "Eesti",
  ru: "Русский",
};

export const DEFAULT_LANGUAGE: Language = "en";

/**
 * Get stored language preference from localStorage
 */
export function getStoredLanguage(): Language {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }
  const stored = localStorage.getItem("ksa-language") as Language;
  return stored && stored in LANGUAGES ? stored : DEFAULT_LANGUAGE;
}

/**
 * Set language preference to localStorage
 */
export function setStoredLanguage(language: Language): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("ksa-language", language);
  }
}

/**
 * Detect browser language, fallback to EN if not supported
 */
export function detectBrowserLanguage(): Language {
  if (typeof navigator === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const browserLang = navigator.language?.split("-")[0].toLowerCase();

  if (browserLang === "et") {
    return "est";
  }
  if (browserLang === "ru") {
    return "ru";
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Get dubbed audio URL for a Rendia video
 * Returns null for English (uses original audio)
 */
export function getDubbedAudioUrl(
  videoId: string,
  language: Language
): string | null {
  if (language === "en") {
    return null; // Use original audio
  }

  return `/audio/rendia-${videoId}-${language}.mp3`;
}

/**
 * Translations dictionary for UI strings
 * Expand as needed for common UI elements
 */
export const translations: Record<Language, Record<string, string>> = {
  en: {
    "language.select": "Select Language",
    "language.english": "English",
    "language.estonian": "Eesti",
    "language.russian": "Русский",
    "nav.home": "Home",
    "nav.conditions": "Conditions",
    "nav.procedures": "Procedures",
    "nav.anatomy": "Anatomy",
    "nav.treatments": "Treatments",
    "video.loading": "Loading video...",
    "video.fallback": "Video not yet available. Coming soon!",
  },
  est: {
    "language.select": "Valige keel",
    "language.english": "English",
    "language.estonian": "Eesti",
    "language.russian": "Русский",
    "nav.home": "Avaleht",
    "nav.conditions": "Haigused",
    "nav.procedures": "Protseduurid",
    "nav.anatomy": "Anatoomia",
    "nav.treatments": "Ravimised",
    "video.loading": "Video laadib...",
    "video.fallback": "Video ei ole veel saadaval. Jõuab peatselt!",
  },
  ru: {
    "language.select": "Выберите язык",
    "language.english": "English",
    "language.estonian": "Eesti",
    "language.russian": "Русский",
    "nav.home": "Главная",
    "nav.conditions": "Заболевания",
    "nav.procedures": "Процедуры",
    "nav.anatomy": "Анатомия",
    "nav.treatments": "Лечение",
    "video.loading": "Загрузка видео...",
    "video.fallback": "Видео скоро будет доступно!",
  },
};

/**
 * Get translated string for current language
 */
export function t(key: string, language: Language = DEFAULT_LANGUAGE): string {
  return translations[language]?.[key] ?? key;
}
