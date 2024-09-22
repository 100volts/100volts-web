import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { Fallback } from "@radix-ui/react-avatar";

const resources = {
  en: {
    translation: {
      Welcome: "Welcome",
    },
  },
  bg: {
    translation: {
      Welcome: "Добре дошли",
    },
  },
};

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  lang: "bg",
  fallback: "bg",
});

export default i18n;
