import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import _ from 'lodash'
import { Index } from 'elasticlunr'
import { withStyles } from '@material-ui/core/styles'
import SearchBar from 'material-ui-search-bar'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import Cookies from 'universal-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../css/search.css'
import TextPreview from './TextPreview'
import MetaText from './MetaText'
import GenericButton from './GenericButton'
import { PaddedContainer } from '../utils/Container'
import { FontSans, pluralize } from '../utils/Text'
import { LightTheme, MUIBoxShadow } from '../utils/Theme'

const cookies = new Cookies()
const monthOptions = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
]
const lengthOptions = [
  { value: 'Short', label: 'Short' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Long', label: 'Long' }
]
const perPage = 5
const dummyResult = {
  id: '',
  timeToRead: 0,
  excerpt: '',
  fields: {
    type: 'dummy',
    kind: 'page',
    slug: ''
  },
  frontmatter: {
    created: '',
    updated: '',
    title: '',
    topic: '',
    icon: 'code',
    tags: [],
    description: '',
    draft: false
  }
}

class SearchSection extends React.Component {
  constructor(props) {
    super(props)
    const that = this
    const { index, types } = this.props
    let totalResults = []
    let topicOptions = []
    let tagOptions = []
    let yearOptions = []
    let counts = {article: 0, project: 0, misc: 0}

    const typeOptions = types.map((type) => {
      return { value: _.capitalize(type), label: _.capitalize(type) }
    })

    _.forEach(index.documentStore.docs, function(value) {
      if(value.draft !== true && value.kind !== 'subpage' && _.includes(that.props.types, value.type)) {
        totalResults.push(that.formatRawDoc(value))
        if(value.topic) {
          topicOptions.push({ value: value.topic, label: value.topic })
        }
        if(value.tags) {
          value.tags.forEach(tag => {
            tagOptions.push({ value: tag, label: tag })
          })
        }
        if(value.created) {
          const year = value.created.substring(0,4)
          yearOptions.push({ value: year, label: year })
        }
        that.updateCounts(value.type, counts)
      }
    })
    totalResults = _.sortBy(totalResults, [option => option.frontmatter.title.toLowerCase()])

    this.state = {
      query: '',
      totalResults: totalResults,
      queriedResults: totalResults,
      filteredResults: totalResults,
      totalArticleCount: counts.article,
      totalProjectCount: counts.project,
      totalMiscCount: counts.misc,
      articleCount: counts.article,
      projectCount: counts.project,
      miscCount: counts.misc,
      typeOptions: typeOptions,
      topicOptions: _.orderBy(_.uniqBy(topicOptions, 'value'), 'value', 'asc'),
      tagOptions: _.sortBy(_.uniqBy(tagOptions, 'value'), [option => option.label.toLowerCase()]),
      yearOptions: _.orderBy(_.uniqBy(yearOptions, 'value'), 'value', 'desc'),
      typesSelected: [],
      topicsSelected: [],
      tagsSelected: [],
      monthsSelected: [],
      yearsSelected: [],
      lengthsSelected: [],
      types: [],
      topics: [],
      tags: [],
      months: [],
      years: [],
      lengths: [],
      searchFiltersVisible: (cookies.get('searchFiltersVisible') === 'true'),
      offset: 0
    }

    this.issueQuery = this.issueQuery.bind(this)
    this.cancelQuery = this.cancelQuery.bind(this)
    this.toggleFilterVisibility = this.toggleFilterVisibility.bind(this)
    this.handleTypeSelect = this.handleTypeSelect.bind(this)
    this.handleTopicSelect = this.handleTopicSelect.bind(this)
    this.handleTagSelect = this.handleTagSelect.bind(this)
    this.handleMonthSelect = this.handleMonthSelect.bind(this)
    this.handleYearSelect = this.handleYearSelect.bind(this)
    this.handleLengthSelect = this.handleLengthSelect.bind(this)
    this.filterQuery = this.filterQuery.bind(this)
    this.formatRawDoc = this.formatRawDoc.bind(this)
    this.updateCounts = this.updateCounts.bind(this)
    this.buildResultString = this.buildResultString.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
  }

  componentDidMount() {
    const { context } = this.props
    const { searchFiltersVisible } = this.state
    let tagsSelected = []
    let tags = []

    if(context !== null) {
      if(context.tag !== undefined) {
        if(!searchFiltersVisible) {
          cookies.set('searchFiltersVisible', 'true', { path: '/' })
        }
        tagsSelected = [{value: context.tag, label: context.tag}]
        tags = [context.tag]
        this.setState({
          searchFiltersVisible: true,
          tagsSelected,
          tags,
        }, () => {
          this.filterQuery(this.state.query, this.state.queriedResults)
        })
      }
    }
  }

  issueQuery(query) {
    const { index, types } = this.props
    const { totalResults } = this.state

    if(query === '') {
      this.filterQuery(query, totalResults)
    }
    else {
      if(!this.index) {
        this.index = Index.load(index)
      }
      const rawResults = this.index.search(
        query, { expand: true }
      ).map(({ ref }) => this.index.documentStore.getDoc(ref))
      let queriedResults = []
      rawResults.forEach((result) => {
        if(result.draft !== true && result.kind !== 'subpage' && _.includes(types, result.type)) {
          queriedResults.push(this.formatRawDoc(result))
        }
      })
      this.filterQuery(query, queriedResults)
    }
  }

  cancelQuery() {
    this.filterQuery('', this.state.totalResults)
  }

  toggleFilterVisibility() {
    if(this.state.searchFiltersVisible === true) {
      cookies.set('searchFiltersVisible', 'false', { path: '/' })
    }
    else {
      cookies.set('searchFiltersVisible', 'true', { path: '/' })
    }

    this.setState(prevState => ({
      searchFiltersVisible: !prevState.searchFiltersVisible,
      typesSelected: [],
      topicsSelected: [],
      tagsSelected: [],
      lengthsSelected: [],
      monthsSelected: [],
      yearsSelected: [],
      types: [],
      topics: [],
      tags: [],
      lengths: [],
      months: [],
      years: [],
    }), () => {this.filterQuery(this.state.query, this.state.queriedResults)})
  }

  handleTypeSelect = (typesSelected) => {
    const initialPos = window.pageYOffset
    let types = []
    if(typesSelected !== []) {
      types = typesSelected.map(type => type.value)
    }
    this.setState({
      typesSelected,
      types,
    }, () => {
      window.scrollTo(0, initialPos)
      this.filterQuery(this.state.query, this.state.queriedResults)
    })
  }

  handleTopicSelect = (topicsSelected) => {
    const initialPos = window.pageYOffset
    let topics = []
    if(topicsSelected !== []) {
      topics = topicsSelected.map(topic => topic.value)
    }
    this.setState({
      topicsSelected,
      topics,
    }, () => {
      window.scrollTo(0, initialPos)
      this.filterQuery(this.state.query, this.state.queriedResults)
    })
  }

  handleTagSelect = (tagsSelected) => {
    const initialPos = window.pageYOffset
    let tags = []
    if(tagsSelected !== []) {
      tags = tagsSelected.map(tag => tag.value)
    }
    this.setState({
      tagsSelected,
      tags,
    }, () => {
      window.scrollTo(0, initialPos)
      this.filterQuery(this.state.query, this.state.queriedResults)
    })
  }

  handleLengthSelect = (lengthsSelected) => {
    const initialPos = window.pageYOffset
    let lengths = []
    if(lengthsSelected !== []) {
      lengths = lengthsSelected.map(length => length.value)
    }
    this.setState({
      lengthsSelected,
      lengths,
    }, () => {
      window.scrollTo(0, initialPos)
      this.filterQuery(this.state.query, this.state.queriedResults)
    })
  }

  handleMonthSelect = (monthsSelected) => {
    const initialPos = window.pageYOffset
    let months = []
    console.log(monthsSelected)
    
    if(monthsSelected !== []) {
      months = monthsSelected.map(month => month.value)
    }
    console.log(months)
    this.setState({
      monthsSelected,
      months,
    }, () => {
      window.scrollTo(0, initialPos)
      this.filterQuery(this.state.query, this.state.queriedResults)
    })
  }

  handleYearSelect = (yearsSelected) => {
    const initialPos = window.pageYOffset
    let years = []
    if(yearsSelected !== []) {
      years = yearsSelected.map(year => year.value)
    }
    this.setState({
      yearsSelected,
      years,
    }, () => {
      window.scrollTo(0, initialPos)
      this.filterQuery(this.state.query, this.state.queriedResults)
    })
  }

  filterQuery(query, queriedResults) {
    const { types, topics, tags, lengths, months, years } = this.state
    const totalFilterLength = types.length + topics.length + tags.length + lengths.length + 
                              months.length + years.length
    let filteredResults = []
    let counts = {article: 0, project: 0, misc: 0}

    if(totalFilterLength !== 0) {
      queriedResults.forEach((result) => {
        if(types.length !== 0 && _.intersection([_.capitalize(result.fields.type)], types).length !== 0) {
          this.updateCounts(result.fields.type, counts)
          filteredResults.push(result)
        }
        else if(topics.length !== 0 && _.intersection([result.frontmatter.topic], topics).length !== 0) {
          this.updateCounts(result.fields.type, counts)
          filteredResults.push(result)
        }
        else if(tags.length !== 0 && _.intersection(result.frontmatter.tags, tags).length !== 0) {
          this.updateCounts(result.fields.type, counts)
          filteredResults.push(result)
        }
        else if(lengths.length !== 0) {
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
          if(_.intersection([length], lengths).length !== 0) {
            this.updateCounts(result.fields.type, counts)
            filteredResults.push(result)
          }
        }
        else if(months.length !== 0 && result.frontmatter.created && 
                _.intersection([result.frontmatter.created.substring(5,7)], months).length !== 0
        ) {
          this.updateCounts(result.fields.type, counts)
          filteredResults.push(result)
        }
        else if(years.length !== 0 && result.frontmatter.created && 
                _.intersection([result.frontmatter.created.substring(0,4)], years).length !== 0
        ) {
          this.updateCounts(result.fields.type, counts)
          filteredResults.push(result)
        }
      })
    }
    else {
      filteredResults = queriedResults
      filteredResults.forEach((result) => {
        this.updateCounts(result.fields.type, counts)
      })
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

  buildResultString() {
    const { types } = this.props
    const { articleCount, projectCount, miscCount } = this.state
    let resultString = ''
    let addSeperator = false

    if(_.includes(types, 'article')) {
      resultString = resultString.concat(pluralize(articleCount, 'article'))
      addSeperator = true
    }
    if(_.includes(types, 'project')) {
      resultString = addSeperator ? 
        resultString.concat(' · ', pluralize(projectCount, 'project')) : 
        resultString.concat(pluralize(projectCount, 'project'))
      addSeperator = true
    }
    if(_.includes(types, 'misc')) {
      resultString = addSeperator ? 
        resultString.concat(' · ', `${miscCount} misc`) : 
        resultString.concat(`${miscCount} misc`)
    }
    return resultString
  }

  handlePageClick(data) {
    const initialPos = window.pageYOffset
    this.setState({
      offset: Math.ceil(data.selected*perPage)
    }, () => {window.scrollTo(0, initialPos)})
  }

  formatRawDoc(rawDoc) {
    return {
      id: rawDoc.id,
      timeToRead: rawDoc.timeToRead,
      excerpt: rawDoc.excerpt,
      fields: {
        type: rawDoc.type,
        kind: rawDoc.kind,
        slug: rawDoc.slug
      },
      frontmatter: {
        created: rawDoc.created,
        updated: rawDoc.updated,
        title: rawDoc.title,
        topic: rawDoc.topic,
        icon: rawDoc.icon,
        tags: rawDoc.tags,
        description: rawDoc.description,
        draft: rawDoc.draft
      }
    }
  }

  updateCounts(type, counts) {
    if(type === 'article') {
      counts.article++
    }
    else if(type === 'project') {
      counts.project++
    }
    else if(type === 'misc') {
      counts.misc++
    }
  }

  render() {
    const { query, filteredResults, articleCount, projectCount, miscCount, searchFiltersVisible, 
            typeOptions, typesSelected, topicOptions, topicsSelected, tagOptions, tagsSelected, 
            lengthsSelected, monthsSelected, yearOptions, yearsSelected, offset } = this.state
    const totalCount = articleCount + projectCount + miscCount
    const resultString = this.buildResultString()
    let paginatedResults = filteredResults
    if(paginatedResults.length%perPage !== 0 || paginatedResults.length === 0) {
      paginatedResults = paginatedResults.concat(Array(perPage-(paginatedResults.length%perPage)).fill(dummyResult))
    }
    const SearchHeader = Styled.div`
      display: flex;
      position: relative;
      z-index: 2;
      padding-top: 4em;
      background-color: ${props => props.theme.primary};
    `
    const StyledSearchBar = withStyles({
      root: {
        flex: '1 1 auto',
        margin: '0 0.5em 1em 0em',
      },
      input: {
        fontFamily: `${FontSans}`,
        fontSize: '1.25em',
        color: `${LightTheme.text}`
      },
      searchIconButton: {
        display: 'none'
      },
      iconButton: {
        transition: 'all 0.3s',
        fontSize: '1em',
        color: 'hsl(0, 0%, 60%)',
        '&:hover': {
          color: 'hsl(0, 0%, 40%)',
          backgroundColor: 'transparent'
        },
        '&>span:last-child': {
          display: 'none'
        }
      }
    })(SearchBar)
    const FilterButton = Styled(GenericButton)`
      && {
        margin: 0 0 1em 0.5em;
        > button {
          height: 100%;
          > span {
            display: flex;
            > svg {
              align-self: center;
            }
          }
        }
      }
    `
    const SelectWrapper = Styled.div`
      display: flex;
      width: 100%;
      > div:nth-child(1) {
        width: ${100/3}%;
        margin: 1em 0.5em 1em 0;
      }
      > div:nth-child(2) {
        width: ${100/3}%;
        margin: 1em 0.5em;
      }
      > div:nth-child(3) {
        width: ${100/3}%;
        margin: 1em 0 1em 0.5em;
      }
    `
    const selectStyles = {
      control: (provided) => ({
        ...provided,
        minHeight: '48px',
        height: '100%',
        borderStyle: 'none',
        boxShadow: `${MUIBoxShadow}`
      }),
      valueContainer: (provided) => ({
        ...provided,
        cursor: 'text'
      }),
      clearIndicator: (provided) => ({
        ...provided,
        cursor: 'pointer'
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        cursor: 'pointer'
      }),
      placeholder: (provided) => ({
        ...provided,
        color: '#9e9e9e'
      }),
      multiValue: (provided) => ({
        ...provided,
        borderRadius: '0.5em',
        border: '0.125em solid #6ecfff',
        color: '#2a2a2a',
        backgroundColor: 'white'
      }),
      multiValueRemove: (provided) => ({
        ...provided,
        cursor: 'pointer'
      }),
      option: (provided) => ({
        ...provided,
        cursor: 'pointer',
        color: '#2a2a2a',
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: '#6ecfff'
        }
      }),
    }
    const SearchCount = Styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        margin-top: 0;
        margin-bottom: 1.5em;
      }
    `
    const SearchResults = Styled.div`
      > div:nth-child(1) {
        display: ${paginatedResults[offset].fields.type === 'dummy' ? 'none' : 'block'};
      }
      > div:nth-child(2) {
        display: ${paginatedResults[offset+1].fields.type === 'dummy' ? 'none' : 'block'};
      }
      > div:nth-child(3) {
        display: ${paginatedResults[offset+2].fields.type === 'dummy' ? 'none' : 'block'};
      }
      > div:nth-child(4) {
        display: ${paginatedResults[offset+3].fields.type === 'dummy' ? 'none' : 'block'};
      }
      > div:nth-child(5) {
        display: ${paginatedResults[offset+4].fields.type === 'dummy' ? 'none' : 'block'};
      }
    `
    const SearchFooter = Styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
    `
    const NoResultsText = Styled.span`
      margin-top: 4em;
      font-size: 2em;
      font-style: italic;
    `
    const PaginateWrapper = Styled.div`
      width: 100%;
      ul {
        display: flex;
        justify-content: center;
        list-style-type: none;
        margin: 0.5em 0;
        padding: 0.75em 0 1em 0;
        overflow: hidden;
        li {
          display: flex;
          :focus {
            outline: none;
          }
          a {
            transition: all 0.3s;
            margin: 0;
            padding: 0.125em 0.75em;
            border: none;
            border-radius: 0.375em;
            font-size: 1.5em;
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
          margin-right: 2em;
          font-weight: bold;
        }
        .next {
          flex: 1 0 auto;
          justify-content flex-end;
          margin-left: 2em;
          font-weight: bold;
        }
      }
    `

    return (
      <PaddedContainer>
        <SearchHeader>
          <StyledSearchBar
            name='search'
            placeholder='Search...'
            onChange={(newQuery) => this.issueQuery(newQuery)}
            onCancelSearch={this.cancelQuery}
            value={query}
            closeIcon={<FontAwesomeIcon icon={['fas', 'times']}/>}
            cancelOnEscape={true}
            autoFocus={true}
          />
          <FilterButton
            type='action'
            text='Filters'
            icon={['fas', 'filter']}
            func={this.toggleFilterVisibility}
            active={searchFiltersVisible ? 'active' : ''}
          />
        </SearchHeader>
        <div className={`${searchFiltersVisible ? 'filters' : 'filters hide'} `}>
          <SelectWrapper>
            <Select
              name='type'
              placeholder='Types...'
              options={typeOptions}
              onChange={this.handleTypeSelect}
              value={typesSelected}
              styles={selectStyles}
              isMulti
              isClearable
            />
            <Select
              name='topic'
              placeholder='Topics...'
              options={topicOptions}
              onChange={this.handleTopicSelect}
              value={topicsSelected}
              styles={selectStyles}
              isMulti
              isClearable
            />
            <Select
              name='tag'
              placeholder='Tags...'
              options={tagOptions}
              onChange={this.handleTagSelect}
              value={tagsSelected}
              styles={selectStyles}
              isMulti
              isClearable
            />
          </SelectWrapper>
          <SelectWrapper>
            <Select
              name='length'
              placeholder='Lengths...'
              options={lengthOptions}
              onChange={this.handleLengthSelect}
              value={lengthsSelected}
              styles={selectStyles}
              isMulti
              isClearable
            />
            <Select
              name='month'
              placeholder='Months...'
              options={monthOptions}
              onChange={this.handleMonthSelect}
              value={monthsSelected}
              styles={selectStyles}
              isMulti
              isClearable
            />
            <Select
              name='year'
              placeholder='Years...'
              options={yearOptions}
              onChange={this.handleYearSelect}
              value={yearsSelected}
              styles={selectStyles}
              isMulti
              isClearable
            />
          </SelectWrapper>
        </div>
        <SearchCount>
          <MetaText
            type='text'
            texts={[resultString]}
            iconType='none'
          />
        </SearchCount>
        <SearchResults>
          <TextPreview data={paginatedResults[offset]}/>
          <TextPreview data={paginatedResults[offset+1]}/>
          <TextPreview data={paginatedResults[offset+2]}/>
          <TextPreview data={paginatedResults[offset+3]}/>
          <TextPreview data={paginatedResults[offset+4]}/>
        </SearchResults>
        <SearchFooter>
          {totalCount === 0 ? 
            <NoResultsText>No results found</NoResultsText> : 
            <PaginateWrapper>
              <ReactPaginate 
                pageCount={Math.ceil(totalCount/perPage)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={this.handlePageClick}
                forcePage={offset/perPage}
                activeClassName={'active'}
                previousLabel={'prev'}
                nextLabel={'next'}
              />
            </PaginateWrapper>
          }
        </SearchFooter>
      </PaddedContainer>
    )
  }
}

SearchSection.propTypes = {
  index: PropTypes.object.isRequired,
  types: PropTypes.array.isRequired,
  context: PropTypes.object.isRequired
}

export default SearchSection
