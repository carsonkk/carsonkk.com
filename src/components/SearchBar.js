import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import SearchBar from 'material-ui-search-bar'

export default class Search extends React.Component {

  shouldComponentUpdate(nextProps) {
      return false
  }


  render() {
    return(
      <SearchBar
        value={this.props.query}
        onChange={(newQuery) => this.props.queryIndex(this.props.index, newQuery)}
      />
    )
  }
}
