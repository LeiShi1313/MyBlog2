import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"

const Header = () => {
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
              to={link.to}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
