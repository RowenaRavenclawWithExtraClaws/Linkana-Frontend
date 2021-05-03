import i18n from "i18next";
import detector from "i18next-browser-languagedetector";

import translationGr from "./locales/gr/translation.json";
import translationENG from "./locales/eng/translation.json";

// the translations
const resources = {
  gr: {
    translation: translationGr,
  },
  eng: {
    translation: translationENG,
  },
};

const language = localStorage.getItem("I18N_LANGUAGE");
if (!language) {
  localStorage.setItem("I18N_LANGUAGE", "en");
}

i18n.use(detector).init({
  resources,
  lng: localStorage.getItem("I18N_LANGUAGE") || "en",
  fallbackLng: "en", // use en if detected lng is not available

  keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
