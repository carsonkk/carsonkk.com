import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'

import BaseLayout from '../components/BaseLayout'
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
      <BaseLayout location={this.props.location}>
        <ProjectsPageWrapper>
          <ImagePreviewSection posts={data.allMarkdownRemark.edges} placeholders={data}/>
          <ShadowWrapper/>
        </ProjectsPageWrapper>
      </BaseLayout>
    )
  }
}

export default ProjectsPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: {fields: {type: {eq: "project"} kind: {eq: "page"}} frontmatter: {draft: {ne: true}}}
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
                fluid(maxWidth: 600, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            bDouble: banner {
              childImageSharp {
                fluid(maxWidth: 900, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            bTriple: banner {
              childImageSharp {
                fluid(maxWidth: 1800, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            icon
            title
            description
            draft
          }
        }
      }
    }
    ...PlaceholderImageFragment
  }
`