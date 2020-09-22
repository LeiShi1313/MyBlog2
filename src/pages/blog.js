import React from "react"
import { graphql } from "gatsby"
import BlogList from "../components/BlogList"
import Layout from "../layouts/Layout"
import SiteMetadata from "../components/SiteMetadata"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SiteMetadata title="Blog" description="Blog of Lei Shi" />

        {data.allMdx.edges && data.allMdx.edges.length > 0 ? (
          <BlogList items={data.allMdx.edges} />
        ) : (
          <div className="container">No articles found.</div>
        )}
    </Layout>
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
        }
      }
    }
  }
}
`
