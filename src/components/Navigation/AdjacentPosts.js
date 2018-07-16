import React from 'react'
import Styled from 'styled-components'

import Button from '../Button'

class AdjacentPosts extends React.Component {
  render() {
    const AdjacentPosts = Styled.div`
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      font-size: 1.5rem;
    `

    return (
      <AdjacentPosts>
        <Button
          type='internal'
          href={this.props.prev ? this.props.prev : '/'}
          icon={['fas', 'angle-left']}
          text='Prev'
          css={this.props.prev ? '' : 'visibility: hidden;'}
        />
        <Button
          type='internal'
          href={this.props.next ? this.props.next : '/'}
          icon={['fas', 'angle-right']}
          text='Next'
          isIconLeft={false}
          css={this.props.next ? '' : 'visibility: hidden;'}
        />
      </AdjacentPosts>
    )
  }
}

export default AdjacentPosts