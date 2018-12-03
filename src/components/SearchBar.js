import React from "react"
import { StaticQuery } from "gatsby"
import { graphql } from "gatsby"

import Search from "./Search"

const SearchBar = () => (
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
        <Search searchIndex={data.siteSearchIndex.index} />
      </div>
    )}
  />
)

export default SearchBar