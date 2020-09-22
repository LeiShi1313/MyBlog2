import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../layouts/Layout"

import "./post.css"

const shortcodes = { Link }

export default function BlogPost({ data }) {
  const post = data.mdx
  return (
    <Layout>
      <div className="markdown container mx-auto">
        <div className="flex flex-wrap items-center justify-start mx-1 w-full mt-6">
          <div className="text-center justify-center w-full">
            <h1 className="">{post.frontmatter.title}</h1>
            <small className="italic">{post.frontmatter.date}</small>
          </div>
          <div className="w-full mt-12">
            <MDXProvider components={shortcodes}>
              <MDXRenderer>{post.body}</MDXRenderer>
            </MDXProvider>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`
