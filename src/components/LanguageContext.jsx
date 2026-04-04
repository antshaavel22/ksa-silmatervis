/**
 * LanguageContext & Provider
 * Global language state management for EST / RU / EN toggle
 *
 * Usage:
 *   <LanguageProvider>
 *     <App />
 *   </LanguageProvider>
 *
 *   Then use: const { language, setLanguage } = useLanguage();
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Language,
  LANGUAGES,
  DEFAULT_LANGUAGE,
  getStoredLanguage,
  setStoredLanguage,
  detectBrowserLanguage,
} from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  // Initialize on mount (client-side only)
  useEffect(() => {
    setMounted(true);

    // Try to load from localStorage
    let initialLanguage = getStoredLanguage();

    // If no stored preference, detect browser language
    if (initialLanguage === DEFAULT_LANGUAGE && getStoredLanguage() === DEFAULT_LANGUAGE) {
      initialLanguage = detectBrowserLanguage();
    }

    setLanguageState(initialLanguage);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setStoredLanguage(lang);

    // Dispatch custom event for components to listen to
    window.dispatchEvent(
      new CustomEvent("language-changed", { detail: { language: lang } })
    );
  };

  // Don't render until hydrated
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook to consume language context
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

/**
 * Language Selector Component
 */
export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-selector flex items-center gap-2">
      <label htmlFor="lang-select" className="text-sm font-medium">
        Language:
      </label>
      <select
        id="lang-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#87be23]"
      >
        {Object.entries(LANGUAGES).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
