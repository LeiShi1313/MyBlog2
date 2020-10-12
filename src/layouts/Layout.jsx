import React, { useEffect } from "react"
import { I18nextProvider } from "react-i18next"
import "typeface-inter"

import { default as i18n, LocaleContext } from "../i18n"
import Footer from "../components/Footer"
import Header from "../components/Header"

import "../styles/style.css"

const Layout = ({ children, location, pageContext: { locale } }) => {
  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return (
    <LocaleContext.Provider value={{ locale }}>
      <I18nextProvider i18n={i18n}>
        <div className="max-w-3xl xl:max-w-4xl mx-auto px-5 py-10">
          <Header location={location} />
          {children}
          <Footer />
        </div>
      </I18nextProvider>
    </LocaleContext.Provider>
  )
}

export default Layout
