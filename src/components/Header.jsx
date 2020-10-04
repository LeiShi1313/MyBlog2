import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import { LocaleContext } from "../layouts/Layout"
import locales from "../../config/i18n"
import IconLink from "./IconLink"

const Header = ({ location }) => {
  const { locale } = React.useContext(LocaleContext)

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
  var idx = 0
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
              to={`${locales[locale].default ? "" : locale}/${link.to}`}
            >
              {link.name}
            </Link>
          ))}
          <a
            className="ml-3 mr-3 xl:ml-6 xl:mr-6 text-sm sm:text-base font-medium border-b-2 pb-2 border-transparent text-gray-700"
            active={`false`}
          >
            {Object.keys(locales)
              .filter(lang => lang !== locale)
              .map(
                lang => {
                  idx++;
                  return (
                    <>
                      {idx > 1 ? "|" : ""}
                      <a
                        key={`menu_desktop_link_language_${lang}`}
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
                    </>
                  );
                }
              )}
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
