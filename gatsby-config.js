// require("dotenv").config()

module.exports = {
  siteMetadata: {
    menu: [
      { name: "Home", to: "/" },
      { name: "Blog", to: "/blog" },
      { name: "About", to: "/about" },
    ],
    links: {
      email: "me@leishi.io",
      github: "https://github.com/leishi1313/",
      linkedin: "https://linkedin.com/in/lei-shi-swe/",
    },
    locale: "en",
    title: `Lei Shi`,
    description: `Personal Website For Lei Shi`,
    author: `@leishi1313`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {
                sh: "bash",
              },
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: "lei",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `public`,
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lei Shi`,
        short_name: `leishi`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#3182ce`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: "gatsby-plugin-matomo",
      options: {
        siteId: "1",
        matomoUrl: "https://matomo.leishi.io",
        siteUrl: "https://leishi.io",
      },
    },
  ],
}
