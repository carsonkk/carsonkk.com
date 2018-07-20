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
    const LeftButton = Styled(Button)`
      && {
        a {
          visibility: ${this.props.prev ? 'visible' : 'hidden'};
        }
      }
    `
    const RightButton = Styled(Button)`
      && {
        a {
          visibility: ${this.props.next ? 'visible' : 'hidden'};
        }
      }
    `

    return (
      <AdjacentPosts>
        <LeftButton
          type='internal'
          href={this.props.prev ? this.props.prev : '/'}
          icon={['fas', 'angle-left']}
          text='Prev'
        />
        <RightButton
          type='internal'
          href={this.props.next ? this.props.next : '/'}
          icon={['fas', 'angle-right']}
          text='Next'
          isIconLeft={false}
        />
      </AdjacentPosts>
    )
  }
}

export default AdjacentPosts