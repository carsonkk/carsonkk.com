import React from 'react'
import Styled from 'styled-components'

import { GutterContainer } from '../components/Container'
import Button from '../components/Button'
import BlogPostPreview from '../components/BlogPostPreview'

class BlogPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: this.props.data.allMarkdownRemark.edges[0].node.fields.date.substring(0,4)
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (param) => (e) => {
    this.setState({
      year: param
    })
  }

  render() {
    const edges = this.props.data.allMarkdownRemark.edges
    let posts = {}
    let years = []
    const YearWrapper = Styled.div`
      margin-left: -8rem;
    `
    const YearSelect = Styled.div`
      position: absolute;
      border-right: 0.25rem solid ${props => props.theme.text};
    `
    const YearButton = Styled(Button)`
      && {
        button {
          border-radius: 0.5rem 0 0 0.5rem;
        }
      }
    `

    edges.forEach(edge => {
      const yearStr = edge.node.fields.date.substring(0,4)
      if(yearStr in posts) {
        posts[yearStr].push(<BlogPostPreview key={edge.node.id} post={edge.node}/>)
      }
      else {
        posts[yearStr] = [<BlogPostPreview key={edge.node.id} post={edge.node}/>]
        years.push(
          <YearButton key={yearStr}
            type='action'
            text={yearStr}
            func={this.handleClick(yearStr)}
            active={this.state.year == yearStr ? 'active' : ''}
          />
        )
      }
    })

    return (
      <GutterContainer>
        <YearWrapper>
          <YearSelect>
            {years}
          </YearSelect>
        </YearWrapper>
        <div>
          {posts[this.state.year]}
        </div>
      </GutterContainer>
    )
  }
}

export default BlogPage

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      filter: {fields: {kind: {eq: "blog"}}}
      sort: {order: DESC, fields: [fields___date]}
    ) {
      edges {
        node {
          id
          timeToRead
          excerpt(pruneLength: 140)
          fields {
            date
            slug
          }
          frontmatter {
            title
            icon
            tags
          }
        }
      }
    }
  }
`
