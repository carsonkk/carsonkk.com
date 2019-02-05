import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { ResMinWidthEm } from '../utils/Responsive'
import ReactPaginate from 'react-paginate'

import BaseLayout from '../components/BaseLayout'
import SEO from '../components/SEO'
import TextPreview from '../components/TextPreview'

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
        margin: 0.5em 0;
        padding: 0.375em 0 0.5em 0;
        overflow: hidden;
        li {
          display: flex;
          :focus {
            outline: none;
          }
          a {
            transition: all 0.3s;
            margin: 0;
            padding: 0.125em 0.375em;
            border: none;
            border-radius: 0.25em;
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
          a {
            padding-top: 0.05em;
          }
        }
        .next {
          flex: 1 0 auto;
          justify-content flex-end;
          margin-left: 2em;
          font-weight: bold;
          a {
            padding-top: 0.05em;
          }
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
          <Flex flexDirection="column" width={[1, 1, 1, 1, ResMinWidthEm.s]} mx="auto" px={[4, 5, 6, 6, 0]} py={5}>
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
          </Flex>
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
