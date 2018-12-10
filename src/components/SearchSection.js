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
import { FontSans, pluralize } from '../utils/Text'
import { LightTheme } from '../utils/Theme'

const categoryOptions = [
  { value: 'Software', label: 'Software' },
  { value: 'Web', label: 'Web' },
  { value: 'Hardware', label: 'Hardware' },
  { value: 'Other', label: 'Other' }
]
const lengthOptions = [
  { value: 'Short', label: 'Short' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Long', label: 'Long' }
]
const perPage = 4
const dummyResult = {
  id: '',
  timeToRead: 0,
  excerpt: '',
  fields: {
    type: 'page',
    kind: 'dummy',
    date: '',
    slug: '',
    tagSlugs: []
  },
  frontmatter: {
    title: '',
    category: '',
    icon: 'code',
    tags: [],
    description: '',
    draft: false
  }
}
const dummyArray = Array(perPage).fill(dummyResult)

class SearchSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      totalResults: dummyArray,
      queriedResults: dummyArray,
      filteredResults: dummyArray,
      totalArticleCount: dummyArray.length,
      totalProjectCount: 0,
      totalMiscCount: 0,
      articleCount: dummyArray.length,
      projectCount: 0,
      miscCount: 0,
      tagOptions: [],
      yearOptions: [],
      tagsSelected: [],
      categoriesSelected: [],
      yearsSelected: [],
      lengthsSelected: [],
      tags: [],
      categories: [],
      years: [],
      lengths: [],
      offset: 0
    }

    this.issueQuery = this.issueQuery.bind(this)
    this.cancelQuery = this.cancelQuery.bind(this)
    this.handleTagSelect = this.handleTagSelect.bind(this)
    this.handleCategorySelect = this.handleCategorySelect.bind(this)
    this.handleYearSelect = this.handleYearSelect.bind(this)
    this.handleLengthSelect = this.handleLengthSelect.bind(this)
    this.filterQuery = this.filterQuery.bind(this)
    this.formatRawDoc = this.formatRawDoc.bind(this)
    this.updateCounts = this.updateCounts.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
  }

  componentDidMount() {
    const that = this
    let totalResults = []
    let tags = []
    let years = []
    let counts = {article: 0, project: 0, misc: 0}
    _.forEach(this.props.index.documentStore.docs, function(value) {
      if(value.draft !== true && value.type !== 'subpage') {
        totalResults.push(that.formatRawDoc(value))
        if(value.date) {
          const year = value.date.substring(0,4)
          years.push({ value: year, label: year })
        }
        if(value.tags) {
          value.tags.forEach(tag => {
            tags.push({ value: tag, label: tag })
          })
        }
        that.updateCounts(value.kind, counts)
      }
    })
    totalResults = _.sortBy(totalResults, [option => option.frontmatter.title.toLowerCase()])
    this.setState({ 
      totalResults,
      queriedResults: totalResults,
      filteredResults: totalResults,
      totalArticleCount: counts.article,
      totalProjectCount: counts.project,
      totalMiscCount: counts.misc,
      articleCount: counts.article,
      projectCount: counts.project,
      miscCount: counts.misc,
      tagOptions: _.sortBy(_.uniqBy(tags, 'value'), [option => option.label.toLowerCase()]),
      yearOptions: _.orderBy(_.uniqBy(years, 'value'), 'value', 'desc')
    })
  }

  issueQuery(query) {
    if(query === '') {
      this.filterQuery(query, this.state.totalResults)
    }
    else {
      if(!this.index) {
        this.index = Index.load(this.props.index)
      }
      const rawResults = this.index.search(query, { expand: true }).map(({ ref }) => this.index.documentStore.getDoc(ref))
      let queriedResults = []
      rawResults.forEach((result) => {
        if(result.draft !== true && result.type !== 'subpage') {
          queriedResults.push(this.formatRawDoc(result))
        }
      })
      this.filterQuery(query, queriedResults)
    }
  }

  cancelQuery() {
    this.filterQuery('', this.state.totalResults)
  }

  handleTagSelect = (tagsSelected) => {
    const tags = this.state.tags.concat([tagsSelected[0].value])
    this.setState({
      tagsSelected,
      tags,
    }, () => {this.filterQuery(this.state.query, this.state.queriedResults)})
  }

  handleCategorySelect = (categoriesSelected) => {
    const categories = this.state.categories.concat([categoriesSelected[0].value])
    this.setState({
      categoriesSelected,
      categories,
    }, () => {this.filterQuery(this.state.query, this.state.queriedResults)})
  }

  handleYearSelect = (yearsSelected) => {
    const years = this.state.years.concat([yearsSelected[0].value])
    this.setState({
      yearsSelected,
      years,
    }, () => {this.filterQuery(this.state.query, this.state.queriedResults)})
  }

  handleLengthSelect = (lengthsSelected) => {
    const lengths = this.state.lengths.concat([lengthsSelected[0].value])
    this.setState({
      lengthsSelected,
      lengths,
    }, () => {this.filterQuery(this.state.query, this.state.queriedResults)})
  }

  filterQuery(query, queriedResults) {
    let filteredResults = []
    const totalFilterLength = this.state.tags.length + this.state.categories.length + this.state.years.length + this.state.lengths.length
    let counts = {article: 0, project: 0, misc: 0}
    if(totalFilterLength !== 0) {
      queriedResults.forEach((result) => {
        if(this.state.tags.length !== 0 && _.intersection(result.frontmatter.tags, this.state.tags).length !== 0) {
          this.updateCounts(result.fields.kind, counts)
          filteredResults.push(result)
        }
        else if(this.state.categories.length !== 0 && _.intersection([result.frontmatter.category], this.state.categories).length !== 0) {
          this.updateCounts(result.fields.kind, counts)
          filteredResults.push(result)
        }
        else if(this.state.years.length !== 0 && result.fields.date && _.intersection([result.fields.date.substring(0,4)], this.state.years).length !== 0) {
          this.updateCounts(result.fields.kind, counts)
          filteredResults.push(result)
        }
        else if(this.state.lengths.length !== 0) {
          let length
          if(result.timeToRead < 10) {
            length = 'Short'
          }
          else if(result.timeToRead < 20) {
            length = 'Medium'
          }
          else {
            length = 'Long'
          }
          if(_.intersection([length], this.state.lengths).length !== 0) {
            this.updateCounts(result.fields.kind, counts)
            filteredResults.push(result)
          }
        }
      })
    }
    else {
      filteredResults = queriedResults
      filteredResults.forEach((result) => {
        this.updateCounts(result.fields.kind, counts)
      })
    }
    if(filteredResults.length%perPage !== 0 || filteredResults.length === 0) {
      filteredResults = filteredResults.concat(Array(perPage-(filteredResults.length%perPage)).fill(dummyResult))
    }
    this.setState({
      query, 
      queriedResults,
      filteredResults,
      articleCount: counts.article,
      projectCount: counts.project,
      miscCount: counts.misc,
      offset: 0
    })
  }

  formatRawDoc(rawDoc) {
    return {
      id: rawDoc.id,
      timeToRead: rawDoc.timeToRead,
      excerpt: rawDoc.excerpt,
      fields: {
        type: rawDoc.type,
        kind: rawDoc.kind,
        date: rawDoc.date,
        slug: rawDoc.slug,
        tagSlugs: rawDoc.tagSlugs
      },
      frontmatter: {
        title: rawDoc.title,
        category: rawDoc.category,
        icon: rawDoc.icon,
        tags: rawDoc.tags,
        description: rawDoc.description,
        draft: rawDoc.draft
      }
    }
  }

  updateCounts(kind, counts) {
    if(kind === 'article') {
      counts.article++
    }
    else if(kind === 'project') {
      counts.project++
    }
    else if(kind === 'misc') {
      counts.misc++
    }
  }

  handlePageClick(data) {
    const initialPos = window.pageYOffset
    this.setState({
      offset: Math.ceil(data.selected*perPage)
    }, () => {window.scrollTo(0, initialPos)})
  }

  render() {
    const totalCount = this.state.articleCount + this.state.projectCount + this.state.miscCount
    const StyledSearchBar = withStyles({
      root: {
        margin: '4rem 0rem 1rem 0rem',
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
    const FilterWrapper = Styled.div`
      display: flex;
      flex-direction: column;
    `
    const SelectWrapper = Styled.div`
      display: flex;
      width: 100%;
      > div:first-child {
        width: 50%;
        margin: 1rem 1rem 1rem 0;
      }
      > div:last-child {
        width: 50%;
        margin: 1rem 0 1rem 1rem;
      }
    `
    const Results = Styled.div`
      > div:nth-child(1) {
        display: ${this.state.filteredResults[this.state.offset].fields.kind === 'dummy' ? 'none' : 'block'};
      }
      > div:nth-child(2) {
        display: ${this.state.filteredResults[this.state.offset+1].fields.kind === 'dummy' ? 'none' : 'block'};
      }
      > div:nth-child(3) {
        display: ${this.state.filteredResults[this.state.offset+2].fields.kind === 'dummy' ? 'none' : 'block'};
      }
      > div:nth-child(4) {
        display: ${this.state.filteredResults[this.state.offset+3].fields.kind === 'dummy' ? 'none' : 'block'};
      }
    `
    const CenteredSearch = Styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
    `
    const ResultText = Styled(MetaText)`
      && {
        margin-bottom: 1rem;
      }
    `
    const SearchPrompt = Styled.span`
      margin-top: 4rem;
      font-size: 2rem;
      font-style: italic;
    `
    const PaginateWrapper = Styled.div`
      width: 100%;
      ul {
        display: flex;
        justify-content: center;
        list-style-type: none;
        margin: 1rem 0;
        padding: 1rem 0;
        overflow: hidden;
        li {
          display: flex;
          :focus {
            outline: none;
          }
          a {
            transition: all 0.3s;
            margin: 0;
            padding: 0.125rem 0.75rem;
            border: none;
            border-radius: 0.375rem;
            font-size: 1.5rem;
            color: ${props => props.theme.text};
            background-color: transparent;
            :focus {
              outline: none;
            }
            :hover {
              color: ${props => props.theme.primary};
              background-color: ${props => props.theme.text};
            }
            ::before {
              background-color: transparent;
            }
          }
        }
        .active {
          a {
            font-weight: bold;
            color: ${props => props.theme.primary};
            background-color: ${props => props.theme.text};
          }
        }
        .previous {
          flex: 1 0 auto;
          margin-right: 2rem; 
        }
        .next {
          flex: 1 0 auto;
          justify-content flex-end;
          margin-left: 2rem;
        }
      }
    `

    return (
      <div>
        <PaddedContainer>
          <StyledSearchBar
            name='search'
            type='text'
            value={this.state.query}
            onChange={(newQuery) => this.issueQuery(newQuery)}
            onCancelSearch={this.cancelQuery}
            cancelOnEscape={true}
            autoFocus={true}
            placeholder='Search...'
          />
          <FilterWrapper>
            <SelectWrapper>
              <Select
                name='tag'
                placeholder='Tags...'
                options={this.state.tagOptions}
                onChange={this.handleTagSelect}
                isMulti
                isClearable
              />
              <Select
                name='category'
                placeholder='Categories...'
                options={categoryOptions}
                onChange={this.handleCategorySelect}
                isMulti
                isClearable
              />
            </SelectWrapper>
            <SelectWrapper>
              <Select
                name='year'
                placeholder='Years...'
                options={this.state.yearOptions}
                onChange={this.handleYearSelect}
                isMulti
                isClearable
              />
              <Select
                name='length'
                placeholder='Lengths...'
                options={lengthOptions}
                onChange={this.handleLengthSelect}
                isMulti
                isClearable
              />
            </SelectWrapper>
          </FilterWrapper>
        </PaddedContainer>
        <PaddedContainer>
          <CenteredSearch>
            <ResultText
              type='text'
              texts={[`${pluralize(this.state.articleCount, 'article')} · ${pluralize(this.state.projectCount, 'project')} · ${this.state.miscCount} misc`]}
              iconType='none'
            />
          </CenteredSearch>
          <Results>
            <TextPreview data={this.state.filteredResults[this.state.offset]}/>
            <TextPreview data={this.state.filteredResults[this.state.offset+1]}/>
            <TextPreview data={this.state.filteredResults[this.state.offset+2]}/>
            <TextPreview data={this.state.filteredResults[this.state.offset+3]}/>
          </Results>
          <CenteredSearch>
            {totalCount === 0 ? 
              <SearchPrompt>No results found</SearchPrompt> : 
              <PaginateWrapper>
                <ReactPaginate 
                  pageCount={Math.ceil(totalCount/perPage)}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                  onPageChange={this.handlePageClick}
                  forcePage={this.state.offset/perPage}
                  activeClassName={'active'}
                  previousLabel={'prev'}
                  nextLabel={'next'}
                />
              </PaginateWrapper>
            }
          </CenteredSearch>
        </PaddedContainer>
      </div>
    )
  }
}

export default SearchSection
