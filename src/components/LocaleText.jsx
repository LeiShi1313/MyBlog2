import React from "react"
import { useTranslation } from "react-i18next"

import locales from "../../config/i18n"
import { findKey } from "../utils/gatsby-node-helpers"


const LocaleText = ({ children, ...props }) => {
    const { i18n } = useTranslation()

    if (i18n.language in props) {
        return props[i18n.language]
    }
    const defaultKey = findKey(locales, l => l.default === true)
    if (defaultKey in props) {
        return props[defaultKey]
    }
    return JSON.stringify(props)
}

export default LocaleText;