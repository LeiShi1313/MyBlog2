import Img from "gatsby-image"
import { useStaticQuery, graphql, Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Card = props => {
  const { frontmatter, excerpt, fields } = props
  const imagesData = useStaticQuery(graphql`
    query {
      images: allFile {
        edges {
          node {
            relativePath
            relativeDirectory
            name
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)
  // TODO: Add default image.
  let image = imagesData.images.edges.find(n => {
    return n.node.relativePath.includes(frontmatter.cover);
  });
  if (image === undefined) {
    const randomImages = imagesData.images.edges.filter(n => n.node.relativeDirectory === 'random')
    image = randomImages[Math.floor(Math.random() * randomImages.length)];
  }

  return (
    <div className="bg-white h-full shadow-sm rounded-md overflow-hidden group">
      <Link to={`blog/posts/${fields.slug}`}>
        <div className="group-hover:opacity-75 transition duration-150 ease-in-out">
          <Img 
            fluid={image.node.childImageSharp.fluid} 
            sizes={{ ...image.node.childImageSharp.fluid, aspectRatio: 3 / 2 }}
            alt={frontmatter.title} 
          />
        </div>
        <div className="p-4 sm:p-5">
          <h1 className="sm:text-lg text-gray-900 font-semibold">{frontmatter.title}</h1>
          <p className="text-sm sm:text-base text-gray-700">{excerpt}</p>
        </div>
      </Link>
    </div>
  )
}

Card.propTypes = {
  frontmatter: PropTypes.object.isRequired,
  excerpt: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
}

export default Card
