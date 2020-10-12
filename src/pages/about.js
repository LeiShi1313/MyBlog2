import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { useTranslation } from "react-i18next"

import SiteMetadata from "../components/SiteMetadata"
import LocaleText from "../components/LocaleText"

const AboutPage = ({ data }) => {
  const { t } = useTranslation()

  return (
    <>
      <SiteMetadata title={t("about.title")} description={t("about.description")} />

      <div className="bg-gray-100">
        <div className="container py-12 lg:pb-16">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 xl:w-3/5 pb-8 md:pb-0">
              <h1 className="pb-5 text-3xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <LocaleText en="About me" zh="关于我" />
              </h1>

              <h2 className="text-xl leading-tight font-semibold tracking-tight text-blue-600 sm:text-2xl">
                <LocaleText
                  en="I'm Lei. And here is my two cats."
                  zh="我是Lei，这是我的两只猫。"
                />
              </h2>
              <div className="mt-4 leading-loose">
                <LocaleText
                  en="I'm currently a software engineer working at Google."
                  zh="我现在是Google的一名软件工程师。"
                />
                <br />
                <LocaleText
                  en="I love coding. Java at work, Python/Javascript for casual."
                  zh="我喜欢写代码，工作用Java，平时喜欢写Python/Javascript。"
                />
                <br />
                <LocaleText
                  en="I'm interested in serverless, blockchain and anything that tech can help with people's day to day life."
                  zh="我现在的兴趣是serverless，区块链，和所有能改善人们生活的科技。"
                />
                <br />
                <LocaleText en="Please visit my&nbsp;" zh="这是我的&nbsp;" />
                <a
                  href={data.site.meta.links.github}
                  className="border-b border-gray-500 hover:border-blue-600 hover:text-blue-600"
                >
                  Github
                </a>
                <LocaleText
                  en="&nbsp;if you want to know what I'm currently working on."
                  zh="，如果想了解我现在在做什么的话。"
                />
                <br />
                <LocaleText
                  en="I also love reading. SciFi is my love, history and culture are good."
                  zh="我也喜欢看书，科幻是我的最爱，人文社科类也非常喜欢。"
                />
                <br />
                <LocaleText
                  en="I love traveling as well. I've been to ~10 countries and counting,"
                  zh="同样喜欢旅游，迄今已经去过了10+个国家并且每年都在上升，"
                />
                <br />
                <LocaleText
                  en="I'm planning to visit every continent except Antarctica before
                30, and visit Arctic and Antarctica before 40. (Fun fact, I
                almost aboard a ship to Antarctica when I was in Ushuaia)"
                  zh="我的计划是在30岁之前踏上除南极外的所有大洲，在40岁之前去到南北极。"
                />
                <br />
                <br />
                <LocaleText
                  en="I'm happy to hear from you:&nbsp;"
                  zh="你可以随时通过邮件来联系我："
                />
                <a
                  href={`mailto:${data.site.meta.links.email}`}
                  className="border-b border-gray-500 hover:border-blue-600 hover:text-blue-600"
                >
                  {data.site.meta.links.email}
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-2/5 md:pl-12">
              <div className="p-5">
                <Img
                  fluid={data.xigua.childImageSharp.fluid}
                  alt="xigua"
                  className="rounded-md shadow-md"
                />
              </div>
              <div className="p-5">
                <Img
                  fluid={data.caomei.childImageSharp.fluid}
                  alt="caomei"
                  className="rounded-md shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage

export const query = graphql`
  query {
    xigua: file(relativePath: { eq: "xigua.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600, quality: 85) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    caomei: file(relativePath: { eq: "caomei.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600, quality: 85) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    site {
      meta: siteMetadata {
        links {
          github
          linkedin
          email
        }
        title
      }
    }
  }
`
