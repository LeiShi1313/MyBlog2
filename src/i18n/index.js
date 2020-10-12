import React from "react"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import LocaleContext from "./LocaleContext"
import locales from "./locales"
import translations from "./translations"


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: process.env.NODE_ENV === "development",
    defaultLanguage: 'en',
    otherLanguages: ['zh'],
    resources: translations,
    fallbackLng: "en",
    // keySeparator: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export { i18n as default, LocaleContext, locales }