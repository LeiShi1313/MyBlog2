import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../layouts/Layout"
import SiteMetadata from "../components/SiteMetadata"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SiteMetadata title="Home" description="Portfolio of Lei Shi" />

      <section className="text-gray-700 body-font">
        <div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
          <div className="w-1/6">
          <Img
            className="max-w-full h-auto rounded-full"
            alt="hero"
            fluid={data.profile.childImageSharp.fluid}
            imgStyle={{borderRadius: '100%', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}
          />
          </div>
          <div className="text-center lg:w-2/3 w-full mt-4">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Lei Shi
            </h1>
            <p className="mb-8 leading-relaxed">
              Yet another software engineer
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    profile: file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 250, quality: 85) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`