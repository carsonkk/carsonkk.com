import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'

import BaseLayout from '../components/BaseLayout'
import SearchBar from '../components/SearchBar'

class SearchPage extends React.Component {
  render() {
    const { data } = this.props
    const { siteSearchIndex } = data

    const SearchWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
    `

    return (
      <BaseLayout location={this.props.location}>
        <SearchWrapper>
          <SearchBar siteSearchIndex={siteSearchIndex.index}></SearchBar>
        </SearchWrapper>
      </BaseLayout>
    )
  }
}

export default SearchPage

export const pageQuery = graphql`
  {
    siteSearchIndex {
      index
    }
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`