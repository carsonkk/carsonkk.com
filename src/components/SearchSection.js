import React from 'react'
import { Index } from 'elasticlunr'
import Styled from 'styled-components'
import SearchBar from 'material-ui-search-bar'
import ReactPaginate from 'react-paginate'

import TextPreview from './TextPreview'
import { PostContainer, PaddedContainer } from '../utils/Container'

export default class SearchSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      rawResults: [],
      filteredResults: [],
      offset: 0,
      perPage: 4
    }
    this.queryIndex = this.queryIndex.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
  }

  queryIndex(query) {
    this.index = this.index ? this.index : Index.load(this.props.index)
    this.setState({
      query,
      results: this.index.search(
        query, 
        { expand: true }
      ).map(({ ref }) => this.index.documentStore.getDoc(ref))
    })
  }

  handlePageClick(data) {
    let selected = data.selected
    let offset = Math.ceil(selected * this.state.perPage)

    this.setState({offset: offset})
  }

  render() {
    let results = []
    this.state.results.forEach(result => {
      if(result.draft !== true) {
        const filtered = {
          timeToRead: result.timeToRead,
          excerpt: result.excerpt,
          fields: {
            kind: result.kind,
            date: result.date,
            slug: result.slug,
            tagSlugs: result.tagSlugs
          },
          frontmatter: {
            title: result.title,
            name: result.name,
            category: result.category,
            icon: result.icon,
            tags: result.tags,
            description: result.description,
            draft: result.draft
          }
        }
        results[result.kind].push(<TextPreview key={result.id} data={filtered}/>)
      }
    })
    const KindWrapper = Styled.div`
      margin-bottom: 3rem;
      h2 {
        font-size: 2em;
        margin: 0 0 1rem 0;
        span {
          font-family: Inconsolata, Monaco, Consolas, "Courier New", Courier, monospace;
        }
      }
    `

    return (
      <div>
        <PostContainer>
          <SearchBar
            value={this.state.query}
            onChange={(newQuery) => this.queryIndex(newQuery)}
          />
        </PostContainer>
        {this.state.query !== '' &&
          <PaddedContainer>
            {/* <KindWrapper>
              <h2>{`${results['article'].length} ${results['article'].length === 1 ? 'result' : 'results'} in `}<span>/articles</span></h2>
              {results['article']}
            </KindWrapper>
            <KindWrapper>
              <h2>{`${results['project'].length} ${results['project'].length === 1 ? 'result' : 'results'} in `}<span>/projects</span></h2>
              {results['project']}
            </KindWrapper>
            <KindWrapper>
              <h2>{`${results['misc'].length} ${results['misc'].length === 1 ? 'result' : 'results'} in `}<span>/misc</span></h2>
              {results['misc']}
            </KindWrapper> */}
            <KindWrapper>
              <h2>{`${results['article'].length} ${results['article'].length === 1 ? 'result' : 'results'} in `}<span>/articles</span></h2>
              {results['article']}
            </KindWrapper>
            <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={"..."}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
          </PaddedContainer>
        }
      </div>
    )
  }
}
