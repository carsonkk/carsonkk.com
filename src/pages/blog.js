import React from 'react'
import Styled from 'styled-components'

import GenericButton from '../components/GenericButton'
import TextPreview from '../components/TextPreview'
import { PaddedContainer } from '../utils/Container'


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
    const { edges } = this.props.data.allMarkdownRemark
    let posts = {}
    let years = []

    const BlogPageWrapper = Styled.div`
      display: flex;
      flex-direction: column;
    `
    const Searchbar = Styled.div`
      margin: 2rem;
    `
    const BlogBodyWrapper = Styled.div`
      display: flex;
      justify-content: center;
    `
    const FilterWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      margin-right: 2rem;
    `
    const PreviewWrapper = Styled.div`
      flex: 1;
    `
    const YearSelect = Styled.div`
      border-right: 0.25rem solid ${props => props.theme.text};
    `
    const YearButton = Styled(GenericButton)`
      && {
        button {
          border-radius: 0.5rem 0 0 0.5rem;
        }
      }
    `
    const Pagination = Styled.div`
      margin: 2rem;
    `

    edges.forEach(edge => {
      const yearStr = edge.node.fields.date.substring(0,4)
      if(yearStr in posts) {
        posts[yearStr].push(<TextPreview key={edge.node.id} post={edge.node}/>)
      }
      else {
        posts[yearStr] = [<TextPreview key={edge.node.id} post={edge.node}/>]
        years.push(
          <YearButton 
            key={yearStr}
            type='action'
            text={yearStr}
            func={this.handleClick(yearStr)}
            active={this.state.year == yearStr ? 'active' : ''}
          />
        )
      }
    })

    return (
      <PaddedContainer>
        <BlogPageWrapper>
          <Searchbar>
          </Searchbar>
          <BlogBodyWrapper>
            <FilterWrapper>
              <div>
                <YearSelect>
                  {years}
                </YearSelect>
              </div>
            </FilterWrapper>
            <PreviewWrapper>
              {posts[this.state.year]}
            </PreviewWrapper>
          </BlogBodyWrapper>
          <Pagination>
          </Pagination>
        </BlogPageWrapper>
      </PaddedContainer>
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
          ...TextPreviewFragment
        }
      }
    }
  }
`
