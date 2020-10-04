import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { FaGithub, FaLinkedin, FaTelegramPlane } from "react-icons/fa"
import { IoMdMail } from "react-icons/io"

import IconLink from "./IconLink"

const Footer = () => {
  const {
    site: {
      meta: { links, title },
    },
  } = useStaticQuery(graphql`
    query FooterQuery {
      site {
        meta: siteMetadata {
          links {
            github
            linkedin
            email
            telegram
          }
          title
        }
      }
    }
  `)

  return (
    <div className="container py-12 md:flex md:items-center md:justify-between">
      <ul className="flex justify-center md:order-2">
        <IconLink href={links.github} icon={FaGithub} label="Github" />
        <IconLink href={links.linkedin} icon={FaLinkedin} label="Linkedin" />
        <IconLink href={links.telegram} icon={FaTelegramPlane} label="Telegram" />
        <IconLink href={`mailto:${links.email}`} icon={IoMdMail} label="Email" />
      </ul>
      <div className="mt-8 md:mt-0 md:order-1">
        <p className="text-center text-sm md:text-base text-gray-700">
          &copy; {new Date().getFullYear()} {title}. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
