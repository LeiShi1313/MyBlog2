import React, { useContext } from "react";
import { Link } from "gatsby";
import { LocaleContext, locales } from "../i18n";

const LocalizedLink = ({ to, ...props }) => {
  const { locale } = useContext(LocaleContext);

  const isIndex = to === `/`;

  const path = locales[locale].default
    ? to
    : `${locales[locale].path}${isIndex ? `` : `${to}`}`;

  return <Link {...props} to={path} />;
};

export default LocalizedLink;
