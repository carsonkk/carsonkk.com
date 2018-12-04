import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Search from './Search'

export default class SearchBar extends React.Component {
  render() {
    return(
      <StaticQuery
        query={graphql`
          query SearchIndexQuery {
            siteSearchIndex {
              index
            }
          }
        `}
        render={data => (
          <div>
            <Search searchIndex={data.siteSearchIndex.index}></Search>
          </div>
        )}
      />
    )
  }
}
