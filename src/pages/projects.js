import React from 'react'
import Styled from 'styled-components'

import ImagePreviewSection from '../components/ImagePreviewSection'


class ProjectsPage extends React.Component {
  render() {
    const { data } = this.props

    const ProjectsPageWrapper = Styled.div`
      flex: 1;
      display: flex;
      flex-direction: column;
    `
    const ShadowWrapper = Styled.div`
      flex: 1;
      position: relative;
      z-index: 1;
      min-height: 1rem;
      box-shadow: 0rem 0rem 1rem 0 black;
    `

    return (
      <ProjectsPageWrapper>
        <ImagePreviewSection posts={data.allMarkdownRemark.edges} data={data}/>
        <ShadowWrapper/>
      </ProjectsPageWrapper>
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