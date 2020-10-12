import React, { useContext } from "react"

import { LocaleContext, locales } from "../i18n"

const LanguageSwitch = ({ location }) => {
  const { locale } = useContext(LocaleContext)

  var idx = 0
  return (
    <span
      className="ml-3 mr-3 xl:ml-6 xl:mr-6 text-sm sm:text-base font-medium border-b-2 pb-2 border-transparent text-gray-700"
      active={`false`}
    >
      {Object.keys(locales)
        .filter(l => l !== locale)
        .map(lang => {
          idx++
          return (
            <React.Fragment key={`header_language_${idx}`} >
              {idx > 1 ? "|" : ""}
              <a
                className="hover:text-gray-800 transition duration-150 ease-in-out"
                href={
                  locales[lang].default
                    ? location.pathname.replace(`/${locale}`, "")
                    : locales[locale].default
                    ? `/${lang}${location.pathname}`
                    : location.pathname.replace(locale, lang)
                }
              >
                {locales[lang].represent}
              </a>
            </React.Fragment>
          )
        })}
    </span>
  )
}

export default LanguageSwitch
