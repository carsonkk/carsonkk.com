import React from 'react'
import Styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import { Index } from 'elasticlunr'
//import SearchBar from 'material-ui-search-bar'

import BaseLayout from '../components/BaseLayout'
import { PostContainer } from '../utils/Container'
import Search from '../components/SearchBar'

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      results: []
    }
    this.queryIndex = this.queryIndex.bind(this)
  }

  queryIndex(idx, query) {
    this.index = this.index ? this.index : Index.load(idx)
    this.setState({
      query,
      results: this.index.search(
        query, 
        { expand: true }
      ).map(({ ref }) => this.index.documentStore.getDoc(ref))
    })
  }

  render() {
    //const { index } = this.props.data.siteSearchIndex
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
            <Search
              index={this.props.data.siteSearchIndex.index}
              query={this.state.query}
              queryIndex={this.queryIndex}
            />
            <ul>
              {this.state.results.map(page => (
                <li key={page.id}>
                  <Link to={"/" + page.path}>{page.title}</Link>
                  {": " + page.tags.join(`,`)}
                </li>
              ))}
            </ul>
          </SearchWrapper>
        </PostContainer>
      </BaseLayout>
    )
  }
}

export default SearchPage

export const pageQuery = graphql`
  query SearchIndexQuery {
    siteSearchIndex {
      index
    }
  }
`