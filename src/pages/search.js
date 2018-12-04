import React from 'react'
import Styled from 'styled-components'

import BaseLayout from '../components/BaseLayout'
import { PostContainer } from '../utils/Container'
import SearchBar from '../components/SearchBar'

class SearchPage extends React.Component {
  render() {
    const SearchWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: auto;
    `

    return (
      <BaseLayout location={this.props.location}>
        <PostContainer>
          <SearchWrapper>
            <SearchBar/>
            
          </SearchWrapper>
        </PostContainer>
      </BaseLayout>
    )
  }
}

export default SearchPage
