import React, { useContext } from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"

import { LocaleContext, locales } from "../i18n"

const SiteMetadata = ({ title, description, image }) => {
  const { locale } = useContext(LocaleContext)
  
  return (
    <Helmet
      defer={false}
      defaultTitle={locales[locale].defaultTitle}
      title={title}
      titleTemplate={`%s | ${locales[locale].defaultTitle}`}
    >
      <html lang={locale} />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={locales[locale].defaultTitle} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={image} />
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
