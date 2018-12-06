import React from 'react'
import { Index } from 'elasticlunr'
import Styled from 'styled-components'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import SearchBar from 'material-ui-search-bar'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'

import TextPreview from './TextPreview'
import MetaText from './MetaText'
import { PaddedContainer } from '../utils/Container'
import { FontSans } from '../utils/Text'
import { LightTheme } from '../utils/Theme'

const categoryOptions = [
  { value: 'software', label: 'Software' },
  { value: 'web', label: 'Web' },
  { value: 'hardware', label: 'Hardware' },
  { value: 'other', label: 'Other' }
]
const lengthOptions = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' }
]
const perPage = 4

class SearchSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      rawResults: [],
      filteredResults: [],
      articleCount: 0,
      projectCount: 0,
      miscCount: 0,
      tagOptions: [],
      yearOptions: [],
      offset: 0
    }
    this.queryIndex = this.queryIndex.bind(this)
    this.cancelQuery = this.cancelQuery.bind(this)
    this.handleYearSelect = this.handleYearSelect.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
  }

  componentDidMount() {
    let tags = []
    let years = []
    this.props.edges.forEach(edge => {
      const { fields, frontmatter } = edge.node
      if(fields.date) {
        const date = new Date(Date.parse(fields.date))
        const year = date.getFullYear()
        years.push({ value: year, label: year })
      }
      if(frontmatter.tags) {
        frontmatter.tags.forEach(tag => {
          tags.push({ value: tag, label: tag })
        })
      }
    })
    this.setState({ 
      tagOptions: _.sortBy(_.uniqBy(tags, 'value'), [option => option.label.toLowerCase()]),
      yearOptions: _.sortBy(_.uniqBy(years, 'value'))
    })
  }

  queryIndex(query) {
    this.index = this.index ? this.index : Index.load(this.props.index)
    const rawResults = this.index.search(query, { expand: true }).map(({ ref }) => this.index.documentStore.getDoc(ref))
    let articleCount = 0
    let projectCount = 0
    let miscCount = 0
    let filteredResults = []
    rawResults.forEach((result) => {
      if(result.draft !== true) {
        if(result.kind === 'article') {
          articleCount++
        }
        else if(result.kind === 'project') {
          projectCount++
        }
        else if(result.kind === 'misc') {
          miscCount++
        }
        const filteredResult = {
          id: result.id,
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
        filteredResults.push(filteredResult)
      }
    })
    this.setState({
      query,
      rawResults,
      filteredResults,
      articleCount,
      projectCount,
      miscCount
    })
  }

  cancelQuery() {
    this.setState({
      query: '',
      rawResults: [],
      filteredResults: []
    })
  }

  handleYearSelect = (resumeTypeSelected) => {
    //this.setState({resumeTypeSelected})
  }

  handlePageClick(data) {
    this.setState({
      offset: Math.ceil(data.selected*perPage)
    })
  }

  render() {
    let paginatedResults = []
    if(this.state.filteredResults) {
      this.state.filteredResults.forEach((result, i) => {
        if(i >= this.state.offset && i < this.state.offset+perPage) {
          paginatedResults.push(<TextPreview key={result.id} data={result}/>)
        }
      })
    }
    const FilterWrapper = Styled.div`
      display: flex;
      flex-direction: column;
    `
    const SelectWrapper = Styled.div`
      display: flex;
      width: 100%;
      >div {
        width: 100%;
        margin: 1rem;
      }
    `

    const StyledSearchBar = withStyles({
      root: {
        margin: '4rem 1rem 1rem 1rem',
      },
      input: {
        fontFamily: `${FontSans}`,
        fontSize: '1.25rem',
        color: `${LightTheme.text}`
      },
      searchIconButton: {
        display: 'none'
      }
    })(SearchBar)

    return (
      <div>
        <PaddedContainer>
          <StyledSearchBar
            name='search'
            type='text'
            value={this.state.query}
            onChange={(newQuery) => this.queryIndex(newQuery)}
            onCancelSearch={this.cancelQuery}
            cancelOnEscape={true}
            autoFocus={true}
            placeholder='Search...'
          />
          <FilterWrapper>
            <SelectWrapper>
              <Select
                name='tag'
                isMulti
                placeholder='Tags...'
                options={this.state.tagOptions}
                className='tag-select'
              />
              <Select
                name='category'
                isMulti
                placeholder='Categories...'
                options={categoryOptions}
                className='category-select'
              />
            </SelectWrapper>
            <SelectWrapper>
              <Select
                name='year'
                isMulti
                placeholder='Years...'
                options={this.state.yearOptions}
                className='year-select'
              />
              <Select
                name='length'
                isMulti
                placeholder='Lengths...'
                options={lengthOptions}
                className='length-select'
              />
            </SelectWrapper>
          </FilterWrapper>
        </PaddedContainer>
        {this.state.query !== '' &&
          <PaddedContainer>
            {paginatedResults}
            <ReactPaginate 
              pageCount={Math.ceil(this.state.filteredResults.length/perPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              previousLabel={"prev"}
              nextLabel={"next"}
              onPageChange={this.handlePageClick}
              activeClassName={"active"}
            />
            <MetaText
              type='text'
              texts={[`${this.state.articleCount} articles · ${this.state.projectCount} projects · ${this.state.miscCount} misc`]}
              iconType='none'
            />
          </PaddedContainer>
        }
      </div>
    )
  }
}

export default SearchSection

//Kind (article/project/misc) - kind
//Length (short/medium/long) - timeToRead
