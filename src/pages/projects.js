import React from 'react'
import Styled from 'styled-components'

import { Container } from '../components/Container'
import ProjectsPostPreview from '../components/ProjectsPostPreview'
import { Colors } from '../utils/Theme'

class ProjectsPage extends React.Component {
  render() {
    const edges = this.props.data.allMarkdownRemark.edges
    const posts = edges.map(edge => <ProjectsPostPreview key={edge.node.id} post={edge.node}/>)
    console.log(edges)
    return (
      <Container>
        <div>
          {posts}
        </div>
      </Container>
    )
  }
}

export default ProjectsPage

export const pageQuery = graphql`
  query ProjectsQuery {
    allMarkdownRemark(filter: {fields: {kind: {eq: "project"}}}) {
      edges {
        node {
          id
          fields {
            slug
            tagSlugs
          }
          frontmatter {
            name
            description
            tags
          }
        }
      }
    }
  }
`
