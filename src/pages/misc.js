import React from 'react'
import Styled from 'styled-components'

import ImagePreviewSection from '../components/ImagePreviewSection'


class MiscPage extends React.Component {
  render() {
    const { data } = this.props

    const MiscPageWrapper = Styled.div`
      flex: 1;
      display: flex;
      flex-direction: column;
    `
    const ShadowWrapper = Styled.div`
      flex: 1;
      z-index: 1;
      box-shadow: 0rem 0rem 1rem 0 black;
    `

    return (
      <MiscPageWrapper>
        <ImagePreviewSection posts={data.allMarkdownRemark.edges} data={data}/>
        <ShadowWrapper/>
      </MiscPageWrapper>
    )
  }
}

export default MiscPage

export const pageQuery = graphql`
  query MiscPageQuery {
    allMarkdownRemark(
      filter: {fields: {kind: {eq: "misc"}} frontmatter: {draft: {ne: true}}}
      sort: {order: ASC, fields: [fields___slug]}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            bSingle: banner {
              childImageSharp {
                sizes(maxWidth: 600, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            bDouble: banner {
              childImageSharp {
                sizes(maxWidth: 900, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            bTriple: banner {
              childImageSharp {
                sizes(maxWidth: 1800, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            icon
            name
            description
          }
        }
      }
    }
    ...PlaceholderImageFragment
  }
`