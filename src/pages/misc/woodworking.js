import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'
import RehypeReact from 'rehype-react'

import BaseLayout from '../../components/BaseLayout'

const RenderAst = new RehypeReact({
  createElement: React.createElement,
  components: {},
}).Compiler

class WoodworkingPage extends React.Component {
  render() {
    const Projects = Styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    `

    return (
      <BaseLayout location={this.props.location}>
        <Projects>
          {RenderAst(this.props.data.markdownRemark.htmlAst)}
        </Projects>
      </BaseLayout>
    )
  }
}

export default WoodworkingPage

export const pageQuery = graphql`
{
  markdownRemark(fields: {slug: {eq: "/misc/woodworking"}}) {
    htmlAst
    fields {
      slug
      tagSlugs
    }
    frontmatter {
      banner {
        childImageSharp {
          fluid(maxWidth: 2400, maxHeight: 1200, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      title
      description
      tags
    }
  }
}
`
