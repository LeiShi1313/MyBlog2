import React, { useContext } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { useTranslation } from "react-i18next";

import LanguageSwitch from "./LanguageSwitch"
import { LocaleContext, locales } from "../i18n"


const Header = ({ location }) => {
  const { locale } = useContext(LocaleContext)
  const { t } = useTranslation()

  const { site } = useStaticQuery(graphql`
    query {
      site {
        data: siteMetadata {
          menu {
            name
            to
          }
        }
      }
    }
  `)
  return (
    <header className="text-gray-700 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row">
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {site.data.menu.map((link, key) => (
            <Link
              key={`menu_desktop_link${key}`}
              className="ml-3 mr-3 xl:ml-6 xl:mr-6 text-sm sm:text-base font-medium border-b-2 pb-2 border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-200 transition duration-150 ease-in-out"
              activeClassName="border-blue-600 text-gray-900 hover:border-blue-600"
              partiallyActive={link.to !== "/"}
              to={`${locales[locale].default ? "" : `/${locale}`}${link.to}`}
            >
              {t(`${link.name}.title`)}
            </Link>
          ))}
          <LanguageSwitch location={location} locale={locale} />
        </nav>
      </div>
    </header>
  )
}

export default Header
