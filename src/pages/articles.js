import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'
import ReactPaginate from 'react-paginate'

import BaseLayout from '../components/BaseLayout'
import SEO from '../components/SEO'
import TextPreview from '../components/TextPreview'
import { PaddedContainer } from '../utils/Container'

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

class ArticlesPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0
    }
    this.handlePageClick = this.handlePageClick.bind(this)
  }

  handlePageClick(data) {
    const initialPos = window.pageYOffset
    this.setState({
      offset: Math.ceil(data.selected*perPage)
    }, () => {window.scrollTo(0, initialPos)})
  }

  render() {
    const { offset } = this.state
    const { edges } = this.props.data.allMarkdownRemark
    let paginatedResults = edges.map(edge => edge.node)
    if(paginatedResults.length%perPage !== 0 || paginatedResults.length === 0) {
      paginatedResults = paginatedResults.concat(Array(perPage-(paginatedResults.length%perPage)).fill(dummyResult))
    }

    const ArticlesPageWrapper = Styled.div`
      padding-top: 4rem;
      width: 100%;
    `
    const ArticlesWrapper = Styled.div`
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
      <BaseLayout>
        <SEO
          pathname={this.props.location.pathname}
          title='Articles'
          description="Articles I've written"
        />
        <ArticlesPageWrapper>
          <PaddedContainer>
            <ArticlesWrapper>
              <TextPreview data={paginatedResults[offset]}/>
              <TextPreview data={paginatedResults[offset+1]}/>
              <TextPreview data={paginatedResults[offset+2]}/>
              <TextPreview data={paginatedResults[offset+3]}/>
              <TextPreview data={paginatedResults[offset+4]}/>
            </ArticlesWrapper>
            <SearchFooter>
              <PaginateWrapper>
                <ReactPaginate 
                  pageCount={Math.ceil(paginatedResults.length/perPage)}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                  onPageChange={this.handlePageClick}
                  forcePage={offset/perPage}
                  activeClassName={'active'}
                  previousLabel={'prev'}
                  nextLabel={'next'}
                />
              </PaginateWrapper>
            </SearchFooter>
          </PaddedContainer>
        </ArticlesPageWrapper>
      </BaseLayout>
    )
  }
}

export default ArticlesPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: {fields: {type: {eq: "article"} kind: {eq: "page"}} frontmatter: {draft: {ne: true}}}
      sort: {order: DESC, fields: [frontmatter___created]}
    ) {
      edges {
        node {
          ...TextPreviewFragment
        }
      }
    }
  }
`
