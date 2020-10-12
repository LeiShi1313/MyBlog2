import React, { useContext } from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"

import { LocaleContext } from "../i18n"
import BlogList from "../components/BlogList"
import SiteMetadata from "../components/SiteMetadata"

const IndexPage = ({ data }) => {
  const { t } = useTranslation()
  const { locale } = useContext(LocaleContext)
  return (
    <>
      <SiteMetadata title={t("blog.title")} description={t("blog.description")} />

        {data.allMdx.edges && data.allMdx.edges.length > 0 ? (
          <BlogList items={data.allMdx.edges.filter(e => e.node.fields.locale === locale)} />
        ) : (
          <div className="container">No articles found.</div>
        )}
    </>
  )
}

export default IndexPage

export const query = graphql`
query {
  allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
    totalCount
    edges {
      node {
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
        }
        excerpt
        fields {
          slug
          locale
          isDefault
        }
      }
    }
  }
}
`
