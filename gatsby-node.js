const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const locales = require(`./config/i18n`)
const {
  localizedSlug,
  findKey,
  removeTrailingSlash,
} = require(`./src/utils/gatsby-node-helpers`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  deletePage(page)

  Object.keys(locales).map(lang => {
    const localizedPath = locales[lang].default
      ? page.path
      : `${locales[lang].path}${page.path}`

    return createPage({
      ...page,
      path: removeTrailingSlash(localizedPath),
      context: {
        ...page.context,
        locale: lang,
        dateFormat: locales[lang].dateFormat,
      }
    })
  })
}

exports.createPages = async ({ graphql, page, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/posts${node.fields.slug}`,
      component: path.resolve(`./src/templates/post.jsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}