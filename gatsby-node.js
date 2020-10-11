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
    const nameArray = node.fileAbsolutePath.split(`.`)
    const name = path.basename(
      node.fileAbsolutePath,
      `.${nameArray[nameArray.length - 1]}`
    )

    const defaultKey = findKey(locales, o => o.default === true)
    const isDefault =
      name === "index" || nameArray[nameArray.length - 2] === defaultKey
    const locale = isDefault ? defaultKey : nameArray[nameArray.length - 2]
    console.log(node.fileAbsolutePath, createFilePath({ node, getNode, basePath: `posts`, trailingSlash: false }), name, isDefault, locale)

    const slug = name === "index"
      ? `/blog/posts${createFilePath({node, getNode, basePath: `posts`, trailingSlash: false })}`
      : `/blog/posts${path.dirname(createFilePath({node, getNode, basePath: `posts`, trailingSlash: false }))}`

    createNodeField({ node, name: `slug`, value: slug })
    createNodeField({ node, name: `locale`, value: locale })
    createNodeField({ node, name: `isDefault`, value: isDefault })
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
      },
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
              locale
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

  var postsBySlug = {}
  const defaultKey = findKey(locales, o => o.default === true)
  // Group posts by their slug
  result.data.allMdx.edges.forEach(({ node }) => {
    if (node.fields.slug in postsBySlug) {
      postsBySlug[node.fields.slug].push(node)
    } else {
      postsBySlug[node.fields.slug] = [node]
    }
  })
  Object.keys(postsBySlug).map(slug => {
    hasDefault = false
    postsBySlug[slug].forEach(node => {
      if (node.frontmatter.locale) {
        node.frontmatter.locale.forEach(locale => {
          const isDefault = locale === defaultKey
          if (isDefault) hasDefault = true
          createPage({
            path: localizedSlug({ isDefault, locale, slug }),
            component: path.resolve(`./src/templates/post.jsx`),
            context: {
              slug,
              locale,
            },
          })
        })
      } else {
        const isDefault = node.fields.isDefault
        if (isDefault) hasDefault = true
        const locale = node.fields.locale
        createPage({
          path: localizedSlug({ isDefault, locale, slug }),
          component: path.resolve(`./src/templates/post.jsx`),
          context: {
            slug,
            locale,
          },
        })
      }
    })
    // If this slug doesn't have a default post, create one
    if (!hasDefault) {
      const locale = postsBySlug[slug][0].fields.locale
      createPage({
        path: localizedSlug({ isDefault: true, locale, slug }),
        component: path.resolve(`./src/templates/post.jsx`),
        context: {
          slug,
          locale,
        },
      })
    }
  })
}
