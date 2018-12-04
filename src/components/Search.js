import React from 'react'
import { Link } from 'gatsby'
import { Index } from 'elasticlunr'
import Styled from 'styled-components'
import SearchBar from 'material-ui-search-bar'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  getOrCreateIndex = () =>
    this.index ? this.index : Index.load(this.props.searchIndex)

  // search = evt => {
  //   const query = evt.target.value
  //   this.index = this.getOrCreateIndex()
  //   this.setState({
  //     query,
  //     results: this.index.search(
  //       query, 
  //       { expand: true }
  //     ).map(({ ref }) => this.index.documentStore.getDoc(ref))
  //   })
  // }

  queryIndex(query) {
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      results: this.index.search(
        query, 
        { expand: true }
      ).map(({ ref }) => this.index.documentStore.getDoc(ref))
    })
  }

  render() {
    console.log(this.state.results)
    return (
      <div>
        <SearchBar
          value={this.state.query}
          onChange={(newValue) => this.queryIndex(newValue)}
        />
        <ul>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link to={"/" + page.path}>{page.title}</Link>
              {": " + page.tags.join(`,`)}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}