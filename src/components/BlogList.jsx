import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

const BlogList = ({ items }) => {
  console.log(items)
  return (
    <div className="container">
      <div className="flex flex-wrap mx-1">
        {items.map(item => (
          <article className="w-full" key={item.node.fields.slug}>
            <header>
              <h3 className="text-2xl font-black mt-16 mb-2">
                <Link
                  className="text-blue-600 shadow-none"
                  to={
                    item.node.fields.isDefault
                      ? item.node.fields.slug
                      : `/${item.node.fields.locale}${item.node.fields.slug}`
                  }
                >
                  {item.node.frontmatter.title}
                </Link>
              </h3>
              <small>{item.node.frontmatter.date}</small>
            </header>
            <section>
              <p
                className="mb-8"
                dangerouslySetInnerHTML={{
                  __html:
                    item.node.frontmatter.description || item.node.excerpt,
                }}
              />
            </section>
          </article>
        ))}
      </div>
    </div>
  )
}

BlogList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default BlogList
