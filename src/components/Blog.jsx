import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

const shortcodes = { Link }

const Blog = ({ post }) => {
  return (
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
  )
}

Blog.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Blog
