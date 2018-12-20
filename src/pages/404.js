import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'

import BaseLayout from '../components/BaseLayout'
import GenericButton from '../components/GenericButton'
import { PaddedContainer } from '../utils/Container'
import { RandomRange } from '../utils/Theme'

class NotFoundPage extends React.Component {
  render() {
    const { edges } = this.props.data.allMarkdownRemark
    let randomPage = edges[RandomRange(0, edges.length-1)].node.fields.slug
    const FoFWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2rem;
    `
    const Title = Styled.h1`
      margin: 0 0 1rem 0;
      font-size: 6rem;
    `
    const Tagline = Styled.span`
      padding: 0 1rem;
      font-style: italic;
      text-align: center;
    `
    const ButtonWrapper = Styled.div`
      display: flex;
      margin: 1rem 0 0 0;
      > span:first-child {
        margin-right: 1rem;
      }
    `

    return (
      <BaseLayout location={this.props.location}>
        <PaddedContainer>
          <FoFWrapper>
            <Title>404</Title>
            <Tagline>The page you were looking for has either been deleted, moved elsewhere, or is currently under maintenance.</Tagline>
            <ButtonWrapper>
              <GenericButton
                type='internal'
                to='/'
                text='Home'
                icon={['fas', 'home']}
              />
              <GenericButton
                type='internal'
                to={randomPage}
                text='Random'
                icon={['fas', 'random']}
              />
            </ButtonWrapper>
            <div>
              {/* Custom 404 stuff here */}
            </div>
          </FoFWrapper>
        </PaddedContainer>
      </BaseLayout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: {fields: {kind: {eq: "page"}} frontmatter: {draft: {ne: true}}}
      sort: {order: DESC, fields: [frontmatter___created]}
    ) {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
`