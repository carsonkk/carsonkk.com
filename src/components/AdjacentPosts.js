import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

import GenericButton from './GenericButton'


class AdjacentPosts extends React.Component {
  render() {
    const { prev, next } = this.props

    const AdjacentPostsWrapper = Styled.div`
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
    `
    const LeftButton = Styled(GenericButton)`
      && {
        a {
          visibility: ${prev != '' ? 'visible' : 'hidden'};
        }
      }
    `
    const RightButton = Styled(GenericButton)`
      && {
        a {
          visibility: ${next != '' ? 'visible' : 'hidden'};
        }
      }
    `

    return (
      <AdjacentPostsWrapper>
        <LeftButton
          type='internal'
          to={prev}
          text='Prev'
          icon={['fas', 'angle-left']}
        />
        <RightButton
          type='internal'
          to={next}
          text='Next'
          icon={['fas', 'angle-right']}
          isIconLeft={false}
        />
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
