import React, { useContext } from "react"

import { LocaleContext, locales } from "../i18n"
import { findKey } from "../utils/gatsby-node-helpers"


const LocaleText = ({ children, ...props }) => {
    const { locale } = useContext(LocaleContext)

    if (locale in props) {
        return props[locale]
    }
    const defaultKey = findKey(locales, l => l.default === true)
    if (defaultKey in props) {
        return props[defaultKey]
    }
    return JSON.stringify(props)
}

export default LocaleText;