import React from 'react'
import Styled from 'styled-components'

import PostImagePreview from './PostImagePreview'

class PostImagePreviewSection extends React.Component {
  render() {
    const { data, posts } = this.props
    const { pSingle, pDouble, pTriple } = data
    const previews = posts.map((post, i) => {
      const { bSingle, bDouble, bTriple } = post.node.frontmatter
      let background = bSingle ? bSingle.childImageSharp.sizes : pSingle.sizes
      if(posts.length%3 == 2 && i >= posts.length-2) {
        background = bDouble ? bDouble.childImageSharp.sizes : pDouble.sizes
      }
      else if(posts.length%3 == 1 && i == posts.length-1) {
        background = bTriple ? bTriple.childImageSharp.sizes : pTriple.sizes
      }
      return(<PostImagePreview key={post.node.id} post={post.node} image={background}/>)
    })
    const PostImagePreviewSectionWrapper = Styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    `

    return (
      <PostImagePreviewSectionWrapper>
        {previews}
      </PostImagePreviewSectionWrapper>
    )
  }
}

export default PostImagePreviewSection

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