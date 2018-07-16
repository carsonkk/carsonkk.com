import React from 'react'
import Styled from 'styled-components'

import ProjectsPostPreview from '../components/ProjectsPostPreview'

class MiscPage extends React.Component {
  render() {
    const edges = this.props.data.allMarkdownRemark.edges
    const posts = edges.map(edge => <ProjectsPostPreview key={edge.node.id} post={edge.node} ph={this.props.data.placeholder}/>)
    const Misc = Styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    `

    return (
      <Misc>
        {posts}
      </Misc>
    )
  }
}

export default MiscPage

export const pageQuery = graphql`
  query MiscQuery {
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
            banner {
              childImageSharp {
                sizes(maxWidth: 600, maxHeight: 300, cropFocus: CENTER) {
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
    placeholder: imageSharp(id: { regex: "/neature.jpg/" }) {
      sizes(maxWidth: 600, maxHeight: 300, cropFocus: CENTER) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`