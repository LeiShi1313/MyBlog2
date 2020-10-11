import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"

import "./post.css"
import Blog from "../components/Blog"


export default function BlogPost({ data }) {
  const posts = data.allMdx.edges
  const { i18n } = useTranslation()
  console.log(posts)

  // Find the locale corresponding post
  const localePost = posts.find(p => p.node.fields.locale === i18n.language)
  if (localePost !== undefined) {
    return <Blog post={localePost.node} />
  }
  // Find the default post
  const defaultPost = posts.find(p => p.node.fields.isDefault)
  if (defaultPost !== undefined) {
    return <Blog post={defaultPost.node} />
  }
  return "Not found"
}

export const query = graphql`
  query($slug: String!) {
    allMdx(filter: {fields: {slug: {eq: $slug}}}) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          body
          fields {
            slug
            locale
            isDefault
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
        }
      }
    }
  }
`
