// LanguageContext.js
import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

const recognizedLangs = ["ar", "fr"]

export const LanguageProvider = ({ children }) => {
  // Default language is "en" (English)
  const defaultLang = "fr";

  // Initialize language from localStorage or use the default
  const [lang, setLang] = useState(
    localStorage.getItem("lang") || defaultLang
  );

  // Save the language to localStorage whenever it changes
  useEffect(() => {
    if (recognizedLangs.includes(lang)){
      localStorage.setItem("lang", lang);
      let direction = lang == "ar" ? "rtl" :  "ltr";
      document.documentElement.setAttribute("dir", direction);
    }
    else {
      setLang(defaultLang);
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};