import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'

import BaseLayout from '../components/BaseLayout'
import SEO from '../components/SEO'
import SearchSection from '../components/SearchSection'

class SearchPage extends React.Component {
  render() {
    const { index } = this.props.data.siteSearchIndex
    const SearchWrapper = Styled.div`
      width: 100%;
    `
    console.log(this.props.location)
    return (
      <BaseLayout>
        <SEO
          pathname={this.props.location.pathname}
          title='Search'
          description="Search through my articles, projects, and more"
        />
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

export default SearchPage

export const pageQuery = graphql`
  {
    siteSearchIndex {
      index
    }
  }
`
