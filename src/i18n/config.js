
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../locales/en/common.json";
import hiCommon from "../locales/hi/common.json";
import paCommon from "../locales/pa/common.json";

import enLanding from "../locales/en/landing.json";
import hiLanding from "../locales/hi/landing.json";
import paLanding from "../locales/pa/landing.json";

import enSite from "../locales/en/site.json";
import hiSite from "../locales/hi/site.json";
import paSite from "../locales/pa/site.json";

const supportedLanguages = ["en", "hi", "pa"];

const resources = {
  en: { common: enCommon, landing: enLanding, site: enSite },
  hi: { common: hiCommon, landing: hiLanding, site: hiSite },
  pa: { common: paCommon, landing: paLanding, site: paSite }
};

function getInitialLanguage() {
  try {
    const savedLanguage = localStorage.getItem("talentforge-language");

    return supportedLanguages.includes(savedLanguage)
      ? savedLanguage
      : "en";
  } catch (error) {
    console.warn("Unable to read the saved TalentForge language preference:", error);
    return "en";
  }
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: false,
    supportedLngs: supportedLanguages,
    defaultNS: "common",
    ns: ["common", "landing", "site"],
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });
}

function updateDocumentLanguage(language) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = language;
  }

  try {
    localStorage.setItem("talentforge-language", language);
  } catch (error) {
    console.warn("Unable to persist the TalentForge language preference:", error);
  }
}

i18n.on("languageChanged", updateDocumentLanguage);

if (i18n.isInitialized) {
  updateDocumentLanguage(i18n.language);
}

export default i18n;
