import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'
import { Flex } from '@rebass/grid'

import BaseLayout from '../components/BaseLayout'
import SEO from '../components/SEO'
import ImagePreviewCollection from '../components/ImagePreviewCollection'

class MiscPage extends React.Component {
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
          title='Misc'
          description="Miscellaneous things"
        />
        <Flex flexDirection="column" width={1}>
          <ImagePreviewCollection edges={edges}/>
          <ShadowWrapper/>
        </Flex>
      </BaseLayout>
    )
  }
}

export default MiscPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: {fields: {type: {eq: "misc"} kind: {ne: "subpage"}} frontmatter: {draft: {ne: true}}}
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
          }
        }
      }
    }
  }
`