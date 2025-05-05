import React from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"

const SiteMetadata = ({ title, description, image }) => {
  const {
    site: {
      siteMetadata: { locale, siteTitle },
    },
  } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          locale
          siteTitle: title
        }
      }
    }
  `)

  return (
    <Helmet
      defer={false}
      defaultTitle={siteTitle}
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
    >
      <html lang={locale} />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={image} />
      <script async defer data-website-id="868d6d2e-0637-4c8e-a39e-e76f5c6e859b" src="https://umami.leishi.io/umami.js"></script>
      <script async defer src="https://track.leishi.io/api/script.js" site-id="1"></script>
    </Helmet>
  )
}

SiteMetadata.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
}

SiteMetadata.defaultProps = {
  image: "/social.png",
}

export default SiteMetadata
