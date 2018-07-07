import React from 'react'
import Styled from 'styled-components'

import { Colors } from '../../utils/Theme'

class NavTabs extends React.Component {
  render() {
    const NavTabs = Styled.div`
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
