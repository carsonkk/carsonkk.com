import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

import GenericButton from './GenericButton'

class AdjacentPosts extends React.Component {
  render() {
    const { currentPost, allPosts } = this.props
    let prevIndex
    let nextIndex
    for(let i = 0; i < allPosts.length; i++) {
      if(allPosts[i].node.fields.slug === currentPost.fields.slug) {
        prevIndex = (i === 0) ? -1 : i-1
        nextIndex = (i === allPosts.length-1) ? -1 : i+1
        break
      }
    }

    const AdjacentPostsWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      margin-top: 1em;
    `
    const SeperatedWrapper = Styled.div`
      display: flex;
      justify-content: space-between;
    `
    const PrevTitle = Styled.span`
      display: block;
      margin: 0.5em 1em 0 0;
      max-width: 15em;
      font-style: italic;
    `
    const NextTitle = Styled.span`
      display: block;
      margin: 0.5em 0 0 1em;
      max-width: 15em;
      font-style: italic;
      text-align: right;
    `

    return (
      <AdjacentPostsWrapper>
        <SeperatedWrapper>
          {prevIndex !== -1 ?
            <GenericButton
              type='internal'
              to={allPosts[prevIndex].node.fields.slug}
              text='prev'
              icon={['fas', 'angle-left']}
              intRel='prev'
            /> :
            <span></span>
          }
          {nextIndex !== -1 ?
            <GenericButton
              type='internal'
              to={allPosts[nextIndex].node.fields.slug}
              text='next'
              icon={['fas', 'angle-right']}
              isIconLeft={false}
              intRel='next'
            /> :
            <span></span>
          }
        </SeperatedWrapper>
        <SeperatedWrapper>
          {prevIndex !== -1 ?
            <PrevTitle>{allPosts[prevIndex].node.frontmatter.title}</PrevTitle> :
            <PrevTitle>This is where it all began</PrevTitle>
          }
          {nextIndex !== -1 ?
            <NextTitle>{allPosts[nextIndex].node.frontmatter.title}</NextTitle> :
            <PrevTitle>This is the end (for now)</PrevTitle>
          }
        </SeperatedWrapper>
      </AdjacentPostsWrapper>
    )
  }
}

AdjacentPosts.defaultProps = {
  prev: '/',
  next: '/'
}

AdjacentPosts.propTypes = {
  prev: PropTypes.string,
  next: PropTypes.string
}

export default AdjacentPosts
