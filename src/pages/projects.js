import React from 'react'
import Styled from 'styled-components'

import { Container } from '../components/Container'
import ProjectsPostPreview from '../components/ProjectsPostPreview'
import { Colors } from '../utils/Theme'

class ProjectsPage extends React.Component {
  render() {
    const edges = this.props.data.allMarkdownRemark.edges
    const posts = edges.map(edge => <ProjectsPostPreview key={edge.node.id} post={edge.node} ph={this.props.data.placeholder}/>)
    const Projects = Styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    `

    return (
      <Projects>
        {posts}
      </Projects>
    )
  }
}

export default ProjectsPage

export const pageQuery = graphql`
  query ProjectsQuery {
    allMarkdownRemark(
      filter: {fields: {kind: {eq: "project"}}}
      sort: {order: ASC, fields: [fields___slug]}
    ) {
      edges {
        node {
          id
          fields {
            slug
            tagSlugs
          }
          frontmatter {
            banner {
              childImageSharp {
                sizes(maxWidth: 600, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
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