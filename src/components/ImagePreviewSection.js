import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Styled from 'styled-components'

import ImagePreview from './ImagePreview'


class ImagePreviewSection extends React.Component {
  render() {
    const { placeholders, posts } = this.props
    const { pSingle, pDouble, pTriple } = placeholders
    const previews = posts.map((post, i) => {
      const { bSingle, bDouble, bTriple } = post.node.frontmatter
      let background = bSingle ? bSingle.childImageSharp.fluid : pSingle.fluid
      if(posts.length%3 === 2 && i >= posts.length-2) {
        background = bDouble ? bDouble.childImageSharp.fluid : pDouble.fluid
      }
      else if(posts.length%3 === 1 && i === posts.length-1) {
        background = bTriple ? bTriple.childImageSharp.fluid : pTriple.fluid
      }
      return(<ImagePreview key={post.node.id} data={post.node} image={background}/>)
    })
    
    const ImagePreviewSectionWrapper = Styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      height: 300px;
    `

    return (
      <ImagePreviewSectionWrapper>
        {previews}
      </ImagePreviewSectionWrapper>
    )
  }
}

ImagePreviewSection.propTypes = {
  placeholders: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired
}

export default ImagePreviewSection

export const componentQuery = graphql`
  fragment PlaceholderImageFragment on Query {
    pSingle: imageSharp(fluid: {originalName: {regex: "/neature.jpg/"}}) {
      fluid(maxWidth: 600, maxHeight: 300, cropFocus: CENTER) {
        ...GatsbyImageSharpFluid
      }
    }
    pDouble: imageSharp(fluid: {originalName: {regex: "/neature.jpg/"}}) {
      fluid(maxWidth: 900, maxHeight: 300, cropFocus: CENTER) {
        ...GatsbyImageSharpFluid
      }
    }
    pTriple: imageSharp(fluid: {originalName: {regex: "/neature.jpg/"}}) {
      fluid(maxWidth: 1800, maxHeight: 300, cropFocus: CENTER) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`