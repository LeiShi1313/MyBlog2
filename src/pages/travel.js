import React, { useContext } from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"

import BlogList from "../components/BlogList"
import SiteMetadata from "../components/SiteMetadata"

const IndexPage = ({ data }) => {
  const { i18n } = useTranslation()
  return (
    <>
      <SiteMetadata title="Blog" description="Blog of Lei Shi" locale={i18n.language} />

        {data.allMdx.edges && data.allMdx.edges.length > 0 ? (
          <BlogList items={data.allMdx.edges.filter(e => e.node.fields.locale === i18n.language)} />
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
        }
      }
    }
  }
}
`
