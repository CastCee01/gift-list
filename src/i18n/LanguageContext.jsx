import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  function t(key) {
    return translations[language][key] || key;
  }

  function toggleLanguage() {
    setLanguage((currentLanguage) =>
      currentLanguage === "en" ? "pt" : "en"
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}