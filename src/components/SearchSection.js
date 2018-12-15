import React from 'react'
import PropTypes from 'prop-types'
import { Index } from 'elasticlunr'
import Styled from 'styled-components'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import SearchBar from 'material-ui-search-bar'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import Cookies from 'universal-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TextPreview from './TextPreview'
import MetaText from './MetaText'
import GenericButton from './GenericButton'
import { PaddedContainer } from '../utils/Container'
import { FontSans, pluralize } from '../utils/Text'
import { LightTheme } from '../utils/Theme'
import '../css/search.css'

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
    slug: '',
    tagSlugs: []
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
    let totalResults = []
    let topicOptions = []
    let tagOptions = []
    let yearOptions = []
    let counts = {article: 0, project: 0, misc: 0}
    const typeOptions = this.props.types.map((type) => {
      return { value: _.capitalize(type), label: _.capitalize(type) }
    })
    _.forEach(this.props.index.documentStore.docs, function(value) {
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
        if(result.draft !== true && result.kind !== 'subpage' && _.includes(this.props.types, result.type)) {
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
      searchFiltersVisible: prevState.searchFiltersVisible === true ? false : true
    }))
  }

  handleTypeSelect = (typesSelected) => {
    let types = []
    if(typesSelected !== []) {
      types = typesSelected.map(type => type.value)
    }
    this.setState({
      typesSelected,
      types,
    }, () => {this.filterQuery(this.state.query, this.state.queriedResults)})
  }

  handleTopicSelect = (topicsSelected) => {
    let topics = []
    if(topicsSelected !== []) {
      topics = topicsSelected.map(topic => topic.value)
    }
    this.setState({
      topicsSelected,
      topics,
    }, () => {this.filterQuery(this.state.query, this.state.queriedResults)})
  }

  handleTagSelect = (tagsSelected) => {
    let tags = []
    if(tagsSelected !== []) {
      tags = tagsSelected.map(tag => tag.value)
    }
    this.setState({
      tagsSelected,
      tags,
    }, () => {this.filterQuery(this.state.query, this.state.queriedResults)})
  }

  handleMonthSelect = (monthsSelected) => {
    let months = []
    console.log(monthsSelected)
    
    if(monthsSelected !== []) {
      months = monthsSelected.map(month => month.value)
    }
    console.log(months)
    this.setState({
      monthsSelected,
      months,
    }, () => {this.filterQuery(this.state.query, this.state.queriedResults)})
  }

  handleYearSelect = (yearsSelected) => {
    let years = []
    if(yearsSelected !== []) {
      years = yearsSelected.map(year => year.value)
    }
    this.setState({
      yearsSelected,
      years,
    }, () => {this.filterQuery(this.state.query, this.state.queriedResults)})
  }

  handleLengthSelect = (lengthsSelected) => {
    let lengths = []
    if(lengthsSelected !== []) {
      lengths = lengthsSelected.map(length => length.value)
    }
    this.setState({
      lengthsSelected,
      lengths,
    }, () => {this.filterQuery(this.state.query, this.state.queriedResults)})
  }

  filterQuery(query, queriedResults) {
    let filteredResults = []
    const totalFilterLength = this.state.types.length + this.state.topics.length + 
                              this.state.tags.length + this.state.months.length + 
                              this.state.years.length + this.state.lengths.length
    let counts = {article: 0, project: 0, misc: 0}
    if(totalFilterLength !== 0) {
      queriedResults.forEach((result) => {
        if(this.state.types.length !== 0 && _.intersection([_.capitalize(result.fields.type)], this.state.types).length !== 0) {
          this.updateCounts(result.fields.type, counts)
          filteredResults.push(result)
        }
        else if(this.state.topics.length !== 0 && _.intersection([result.frontmatter.topic], this.state.topics).length !== 0) {
          this.updateCounts(result.fields.type, counts)
          filteredResults.push(result)
        }
        else if(this.state.tags.length !== 0 && _.intersection(result.frontmatter.tags, this.state.tags).length !== 0) {
          this.updateCounts(result.fields.type, counts)
          filteredResults.push(result)
        }
        else if(this.state.months.length !== 0 && result.frontmatter.created && _.intersection([result.frontmatter.created.substring(5,7)], this.state.months).length !== 0) {
          this.updateCounts(result.fields.type, counts)
          filteredResults.push(result)
        }
        else if(this.state.years.length !== 0 && result.frontmatter.created && _.intersection([result.frontmatter.created.substring(0,4)], this.state.years).length !== 0) {
          this.updateCounts(result.fields.type, counts)
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
            this.updateCounts(result.fields.type, counts)
            filteredResults.push(result)
          }
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

  formatRawDoc(rawDoc) {
    return {
      id: rawDoc.id,
      timeToRead: rawDoc.timeToRead,
      excerpt: rawDoc.excerpt,
      fields: {
        type: rawDoc.type,
        kind: rawDoc.kind,
        slug: rawDoc.slug,
        tagSlugs: rawDoc.tagSlugs
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

  buildResultString() {
    let resultString = ''
    let addSeperator = false
    if(_.includes(this.props.types, 'article')) {
      resultString = resultString.concat(pluralize(this.state.articleCount, 'article'))
      addSeperator = true
    }
    if(_.includes(this.props.types, 'project')) {
      addSeperator ? resultString = resultString.concat(' · ', pluralize(this.state.projectCount, 'project')) : resultString = resultString.concat(pluralize(this.state.projectCount, 'project'))
      addSeperator = true
    }
    if(_.includes(this.props.types, 'misc')) {
      addSeperator ? resultString = resultString.concat(' · ', `${this.state.miscCount} misc`) : resultString = resultString.concat(`${this.state.miscCount} misc`)
    }
    return resultString
  }

  handlePageClick(data) {
    const initialPos = window.pageYOffset
    this.setState({
      offset: Math.ceil(data.selected*perPage)
    }, () => {window.scrollTo(0, initialPos)})
  }

  render() {
    const totalCount = this.state.articleCount + this.state.projectCount + this.state.miscCount
    const resultString = this.buildResultString()
    let filteredResults = this.state.filteredResults
    if(filteredResults.length%perPage !== 0 || filteredResults.length === 0) {
      filteredResults = filteredResults.concat(Array(perPage-(filteredResults.length%perPage)).fill(dummyResult))
    }
    const searchWrapper = {
      display: 'flex',
      marginTop: '4rem'
    }
    const StyledSearchBar = withStyles({
      root: {
        flex: '1 1 auto',
        margin: '0 0.5rem 1rem 0rem',
      },
      input: {
        fontFamily: `${FontSans}`,
        fontSize: '1.25rem',
        color: `${LightTheme.text}`
      },
      searchIconButton: {
        display: 'none'
      },
      iconButton: {
        transition: 'all 0.3s',
        fontSize: '1rem',
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
    const SelectWrapper = Styled.div`
      display: flex;
      width: 100%;
      > div:nth-child(1) {
        width: ${100/3}%;
        margin: 1rem 0.5rem 1rem 0;
      }
      > div:nth-child(2) {
        width: ${100/3}%;
        margin: 1rem 0.5rem;
      }
      > div:nth-child(3) {
        width: ${100/3}%;
        margin: 1rem 0 1rem 0.5rem;
      }
    `
    const selectStyles = {
      control: (provided) => ({
        ...provided,
        minHeight: '48px',
        height: '100%',
        borderStyle: 'none',
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
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
        borderRadius: '0.5rem',
        border: '0.125rem solid #6ecfff',
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
    const FilterButton = Styled(GenericButton)`
      && {
        margin: 0 0 1rem 0.5rem;
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
    const Results = Styled.div`
      > div:nth-child(1) {
        display: ${filteredResults[this.state.offset].fields.type === 'dummy' ? 'none' : 'block'};
      }
      > div:nth-child(2) {
        display: ${filteredResults[this.state.offset+1].fields.type === 'dummy' ? 'none' : 'block'};
      }
      > div:nth-child(3) {
        display: ${filteredResults[this.state.offset+2].fields.type === 'dummy' ? 'none' : 'block'};
      }
      > div:nth-child(4) {
        display: ${filteredResults[this.state.offset+3].fields.type === 'dummy' ? 'none' : 'block'};
      }
      > div:nth-child(5) {
        display: ${filteredResults[this.state.offset+4].fields.type === 'dummy' ? 'none' : 'block'};
      }
    `
    const CenteredSearch = Styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
    `
    const ResultText = Styled(MetaText)`
      && {
        margin-top: 0;
        margin-bottom: 1.5rem;
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
        margin: 0.5rem 0;
        padding: 0.75rem 0 1rem 0;
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
          font-weight: bold;
        }
        .next {
          flex: 1 0 auto;
          justify-content flex-end;
          margin-left: 2rem;
          font-weight: bold;
        }
      }
    `
    return (
      <div>
        <PaddedContainer>
          <div style={searchWrapper}>
            <StyledSearchBar
              name='search'
              placeholder='Search...'
              onChange={(newQuery) => this.issueQuery(newQuery)}
              onCancelSearch={this.cancelQuery}
              value={this.state.query}
              closeIcon={<FontAwesomeIcon icon={['fas', 'times']}/>}
              cancelOnEscape={true}
              autoFocus={true}
            />
            <FilterButton
              type='action'
              text='Filters'
              icon={['fas', 'filter']}
              func={this.toggleFilterVisibility}
            />
          </div>
          <div className={`${this.state.searchFiltersVisible ? 'filters' : 'filters hide'} `}>
            <SelectWrapper>
              <Select
                name='type'
                placeholder='Types...'
                options={this.state.typeOptions}
                onChange={this.handleTypeSelect}
                value={this.state.typesSelected}
                styles={selectStyles}
                classNamePrefix="react-select"
                className="react-select"
                isMulti
                isClearable
              />
              <Select
                name='topic'
                placeholder='Topics...'
                options={this.state.topicOptions}
                onChange={this.handleTopicSelect}
                value={this.state.topicsSelected}
                styles={selectStyles}
                classNamePrefix="react-select"
                className="react-select"
                isMulti
                isClearable
              />
              <Select
                name='tag'
                placeholder='Tags...'
                options={this.state.tagOptions}
                onChange={this.handleTagSelect}
                value={this.state.tagsSelected}
                styles={selectStyles}
                classNamePrefix="react-select"
                className="react-select"
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
                value={this.state.lengthsSelected}
                styles={selectStyles}
                isMulti
                isClearable
              />
              <Select
                name='month'
                placeholder='Months...'
                options={monthOptions}
                onChange={this.handleMonthSelect}
                value={this.state.monthsSelected}
                styles={selectStyles}
                isMulti
                isClearable
              />
              <Select
                name='year'
                placeholder='Years...'
                options={this.state.yearOptions}
                onChange={this.handleYearSelect}
                value={this.state.yearsSelected}
                styles={selectStyles}
                isMulti
                isClearable
              />
            </SelectWrapper>
          </div>
          <CenteredSearch>
            <ResultText
              type='text'
              texts={[resultString]}
              iconType='none'
            />
          </CenteredSearch>
          <Results>
            <TextPreview data={filteredResults[this.state.offset]}/>
            <TextPreview data={filteredResults[this.state.offset+1]}/>
            <TextPreview data={filteredResults[this.state.offset+2]}/>
            <TextPreview data={filteredResults[this.state.offset+3]}/>
            <TextPreview data={filteredResults[this.state.offset+4]}/>
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

SearchSection.propTypes = {
  index: PropTypes.object.isRequired,
  types: PropTypes.array.isRequired
}

export default SearchSection
