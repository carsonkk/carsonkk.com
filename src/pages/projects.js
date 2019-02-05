import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'
import { Flex } from '@rebass/grid'

import BaseLayout from '../components/BaseLayout'
import SEO from '../components/SEO'
import ImagePreviewCollection from '../components/ImagePreviewCollection'

class ProjectsPage extends React.Component {
  render() {
    const { edges } = this.props.data.allMarkdownRemark
    const ShadowWrapper = Styled.div`
      flex: 1;
      position: relative;
      z-index: 1;
      min-height: 1em;
      box-shadow: 0em 0em 1em 0 black;
    `

    return (
      <BaseLayout>
        <SEO
          pathname={this.props.location.pathname}
          title='Projects'
          description="Projects I've made"
        />
        <Flex flexDirection="column" width={1}>
          <ImagePreviewCollection edges={edges}/>
          <ShadowWrapper/>
        </Flex>
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
            banner: banner {
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
  }
`
