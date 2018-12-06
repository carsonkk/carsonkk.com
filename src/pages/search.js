import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'

import BaseLayout from '../components/BaseLayout'
import SearchSection from '../components/SearchSection'

export default class SearchPage extends React.Component {
  render() {
    const { index } = this.props.data.siteSearchIndex
    const { edges } = this.props.data.allMarkdownRemark
    const SearchWrapper = Styled.div`
      flex: 1;
      display: flex;
      flex-direction: column;
      width: 100%;
    `

    return (
      <BaseLayout location={this.props.location}>
        <SearchWrapper>
          <SearchSection
            type='text'
            index={index}
            kinds={['article', 'project', 'misc']}
            edges={edges}
          />
        </SearchWrapper>
      </BaseLayout>
    )
  }
}

export const pageQuery = graphql`
  {
    siteSearchIndex {
      index
    }
    allMarkdownRemark(
      filter: {frontmatter: {draft: {ne: true}}}
      sort: {order: DESC, fields: [fields___date]}
    ) {
      edges {
        node {
          fields {
            date
          }
          frontmatter {
            tags
          }
        }
      }
    }
  }
`