import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'

import BaseLayout from '../components/BaseLayout'
import SearchSection from '../components/SearchSection'

export default class SearchPage extends React.Component {
  render() {
    const { index } = this.props.data.siteSearchIndex
    const SearchWrapper = Styled.div`
      width: 100%;
    `

    return (
      <BaseLayout location={this.props.location}>
        <SearchWrapper>
          <SearchSection
            index={index}
            types={['article', 'project', 'misc']}
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
  }
`
