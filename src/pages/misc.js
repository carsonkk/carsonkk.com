import React from 'react'

import ImagePreviewSection from '../components/ImagePreviewSection'

class MiscPage extends React.Component {
  render() {
    const { data } = this.props
    return (
      <ImagePreviewSection posts={data.allMarkdownRemark.edges} data={data}/>
    )
  }
}

export default MiscPage

export const pageQuery = graphql`
  query MiscPageQuery {
    allMarkdownRemark(
      filter: {fields: {kind: {eq: "misc"}}}
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