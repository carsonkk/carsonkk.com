import React from 'react'

import ImagePreviewSection from '../components/ImagePreviewSection'

class ProjectsPage extends React.Component {
  render() {
    const { data } = this.props
    return (
      <ImagePreviewSection posts={data.allMarkdownRemark.edges} data={data}/>
    )
  }
}

export default ProjectsPage

export const pageQuery = graphql`
  query ProjectsPageQuery {
    allMarkdownRemark(
      filter: {fields: {kind: {eq: "project"} type: {eq: "page"}} frontmatter: {draft: {ne: true}}}
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
            draft
          }
        }
      }
    }
    ...PlaceholderImageFragment
  }
`