import React from 'react'
import Styled from 'styled-components'

class NavTabs extends React.Component {
  render() {
    const NavTabs = Styled.div`
      display: flex;
      border-top: 0.125rem solid ${Colors.text};
    `

    return (
      <NavTabs>
        {this.props.tabs}
      </NavTabs>
    )
  }
}

export default NavTabs
