import React from 'react'
import Styled from 'styled-components'
import RehypeReact from 'rehype-react'

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
      <Projects>
        {RenderAst(this.props.data.markdownRemark.htmlAst)}
      </Projects>
    )
  }
}

export default WoodworkingPage

export const pageQuery = graphql`
query WoodworkingQuery {
  markdownRemark(fields: {slug: {eq: "/misc/woodworking"}}) {
    htmlAst
    fields {
      slug
      tagSlugs
    }
    frontmatter {
      banner {
        childImageSharp {
          sizes(maxWidth: 2400, maxHeight: 1200, cropFocus: CENTER) {
            ...GatsbyImageSharpSizes
          }
        }
      }
      name
      description
      tags
    }
  }
}
`
