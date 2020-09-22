import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import Layout from "../layouts/Layout"
import SiteMetadata from "../components/SiteMetadata"

const AboutPage = ({ data }) => (
  <Layout>
    <SiteMetadata title="About" description="Sample description" />

    <div className="container py-12 lg:pb-16">
      <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-gray-900">
        Congratulations!
        <span role="img" aria-label="party popper">
          🎉
        </span>
        <br />
        <span className="text-blue-600">
          You just found yet another software engineer's personal website.
        </span>
      </h2>
    </div>
    <div className="bg-gray-100">
      <div className="container py-12 lg:pb-16">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 xl:w-3/5 pb-8 md:pb-0">
            <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              About me
            </h1>

            <h2 className="text-xl leading-tight font-semibold tracking-tight text-blue-600 sm:text-2xl">
              I'm Lei. And here is my two cats.
            </h2>
            <div className="mt-4 leading-loose">
              I'm currently a software engineer working at Google. 
              <br />
              I love coding. Java at work, Python/Javascript for casual. 
              <br />
              I'm interested in serverless, blockchain and anything that tech can help with people's day to day life.
              <br />
              Please visit my
              &nbsp;<a 
                href={data.site.meta.links.github}
                className="border-b border-gray-500 hover:border-blue-600 hover:text-blue-600"
              >Github</a> if you want to know what I'm currently working on.
              <br />
              I also love reading. SciFi is my love, history and culture are good.
              <br />
              I love traveling as well. I've been to ~10 countries and counting, 
              <br />
              I'm planning to visit every continent except Antarctica before 30, and visit Arctic and Antarctica before 40.
              (Fun fact, I almost aboard a ship to Antarctica when I was in Ushuaia)
              <br />
              <br />
              I'm happy to hear from you:
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
  </Layout>
)

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
