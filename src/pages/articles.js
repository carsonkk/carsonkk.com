import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'

import BaseLayout from '../components/BaseLayout'
import GenericButton from '../components/GenericButton'
import TextPreview from '../components/TextPreview'
import { PaddedContainer } from '../utils/Container'

class ArticlesPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: this.props.data.allMarkdownRemark.edges[0].node.fields.date.substring(0,4)
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (param) => (e) => {
    this.setState({
      year: param
    })
  }

  render() {
    const { edges } = this.props.data.allMarkdownRemark
    let posts = {}
    let years = []

    const ArticlesPageWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
    `
    const Searchbar = Styled.div`
      margin: 2rem;
    `
    const ArticlesBodyWrapper = Styled.div`
      display: flex;
      justify-content: center;
    `
    const FilterWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      margin-right: 2rem;
    `
    const PreviewWrapper = Styled.div`
      flex: 1;
    `
    const YearSelect = Styled.div`
      border-right: 0.25rem solid ${props => props.theme.text};
    `
    const YearButton = Styled(GenericButton)`
      && {
        button {
          border-radius: 0.5rem 0 0 0.5rem;
        }
      }
    `
    const Pagination = Styled.div`
      margin: 2rem;
    `

    edges.forEach(edge => {
      const yearStr = edge.node.fields.date.substring(0,4)
      if(yearStr in posts) {
        posts[yearStr].push(<TextPreview key={edge.node.id} data={edge.node}/>)
      }
      else {
        posts[yearStr] = [<TextPreview key={edge.node.id} data={edge.node}/>]
        years.push(
          <YearButton 
            key={yearStr}
            type='action'
            text={yearStr}
            func={this.handleClick(yearStr)}
            active={this.state.year === yearStr ? 'active' : ''}
          />
        )
      }
    })

    return (
      <BaseLayout location={this.props.location}>
        <PaddedContainer>
          <ArticlesPageWrapper>
            <Searchbar>
            </Searchbar>
            <ArticlesBodyWrapper>
              <FilterWrapper>
                <div>
                  <YearSelect>
                    {years}
                  </YearSelect>
                </div>
              </FilterWrapper>
              <PreviewWrapper>
                {posts[this.state.year]}
              </PreviewWrapper>
            </ArticlesBodyWrapper>
            <Pagination>
            </Pagination>
          </ArticlesPageWrapper>
        </PaddedContainer>
      </BaseLayout>
    )
  }
}

export default ArticlesPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: {fields: {kind: {eq: "article"} type: {eq: "page"}} frontmatter: {draft: {ne: true}}}
      sort: {order: ASC, fields: [fields___number]}
    ) {
      edges {
        node {
          ...TextPreviewFragment
        }
      }
    }
  }
`
