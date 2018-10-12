import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

import ImagePreview from './ImagePreview'


class ImagePreviewSection extends React.Component {
  render() {
    const { data, posts } = this.props
    const { pSingle, pDouble, pTriple } = data
    const angles = [1, 45, 90, 135, 180, 225, 270, 315, 359]
    const previews = posts.map((post, i) => {
      const { bSingle, bDouble, bTriple } = post.node.frontmatter
      const angle = `${angles[Math.floor(Math.random()*angles.length)]}deg`
      let background = bSingle ? bSingle.childImageSharp.sizes : pSingle.sizes
      if(posts.length%3 == 2 && i >= posts.length-2) {
        background = bDouble ? bDouble.childImageSharp.sizes : pDouble.sizes
      }
      else if(posts.length%3 == 1 && i == posts.length-1) {
        background = bTriple ? bTriple.childImageSharp.sizes : pTriple.sizes
      }
      return(<ImagePreview key={post.node.id} post={post.node} image={background} angle={angle}/>)
    })
    
    const ImagePreviewSectionWrapper = Styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    `

    return (
      <ImagePreviewSectionWrapper>
        {previews}
      </ImagePreviewSectionWrapper>
    )
  }
}

ImagePreviewSection.propTypes = {
  data: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired
}

export default ImagePreviewSection

export const componentQuery = graphql`
  fragment PlaceholderImageFragment on RootQueryType {
    pSingle: imageSharp(id: { regex: "/neature.jpg/" }) {
      sizes(maxWidth: 600, maxHeight: 300, cropFocus: CENTER) {
        ...GatsbyImageSharpSizes
      }
    }
    pDouble: imageSharp(id: { regex: "/neature.jpg/" }) {
      sizes(maxWidth: 900, maxHeight: 300, cropFocus: CENTER) {
        ...GatsbyImageSharpSizes
      }
    }
    pTriple: imageSharp(id: { regex: "/neature.jpg/" }) {
      sizes(maxWidth: 1800, maxHeight: 300, cropFocus: CENTER) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`