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
    const name = path.basename(node.fileAbsolutePath, `.md`)
    const isDefault = name === 'index';
    const defaultKey = findKey(locales, o => o.default === true)
    const lang = isDefault ? defaultKey : name.split(`.`)[1]
    const slug = path.dirname(
      createFilePath({ node, getNode, basePath: `posts`, trailingSlash: false }))

    createNodeField({node, name: `slug`, value: slug})
    createNodeField({node, name: `locale`, value: lang})
    createNodeField({node, name: `isDefault`, value: isDefault})
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
              locale
              isDefault
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    console.error(result.errors)
    return
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    const isDefault = node.fields.isDefault
    const locale = node.fields.locale
    const slug = `/blog/posts${node.fields.slug}`
    const path = localizedSlug({ isDefault, locale, slug })
    createPage({
      path,
      component: path.resolve(`./src/templates/post.jsx`),
      context: {
        slug,
        path,
        locale
      },
    })
  })
}