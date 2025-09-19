import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonEn from './locales/en/common.json';
import homepageEn from './locales/en/homepage.json';
import aboutpageEn from './locales/en/aboutpage.json';
import contactpageEn from './locales/en/contactpage.json';
import donationpageEn from './locales/en/donationpage.json';

import commonMr from './locales/mr/common.json';
import homepageMr from './locales/mr/homepage.json';
import aboutpageMr from './locales/mr/aboutpage.json';
import contactpageMr from './locales/mr/contactpage.json';
import donationpageMr from './locales/mr/donationpage.json';

const resources = {
  en: {
    common: commonEn,
    homepage: homepageEn,
    aboutpage: aboutpageEn,
    contactpage: contactpageEn,
    donationpage: donationpageEn
  },
  mr: {
    common: commonMr,
    homepage: homepageMr,
    aboutpage: aboutpageMr,
    contactpage: contactpageMr,
    donationpage: donationpageMr
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'mr', // Default language
    debug: false,
    
    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false
    },

    // Default namespace
    defaultNS: 'common',
    ns: ['common','homepage','aboutpage','contactpage','donationpage'] 
  });

export default i18n;
