import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./utils/i18n/en.json";
import th from "./utils/i18n/th.json";

const resources = {
  en: { translation: en },
  th: { translation: th },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "th",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
