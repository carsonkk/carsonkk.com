import React from 'react'
import Styled, { keyframes } from 'styled-components'
import { fadeInUp, fadeOutDown } from 'react-animations'
import Cookies from 'universal-cookie'

import snowstorm from '../js/snowstorm.js'
import GenericButton from './GenericButton'
import Logo from './Logo'
import { RandomIcon } from '../utils/Theme'

const cookies = new Cookies()

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {snow: (cookies.get('snow') === 'true')}
    this.toggleSnow = this.toggleSnow.bind(this)
  }

  componentDidMount() {
    if(!this.state.snow) {
      snowstorm.start()
      snowstorm.active = !snowstorm.active
      snowstorm.stop()
      snowstorm.freeze()
    }
  }

  toggleSnow() {
    if(this.state.snow === true) {
      cookies.set('snow', 'false', { path: '/' })
    }
    else {
      cookies.set('snow', 'true', { path: '/' })
    }
    snowstorm.toggleSnow()
    this.setState(prevState => ({snow: !prevState.snow}))
  }
  
  render() {
    const NavHeader = Styled.header`
      flex: 0 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      z-index: 100;
      overflow: hidden;
      background-color: ${props => props.theme.secondary};
      box-shadow: 0 0 1rem 0 black;
    `
    const NavItems = Styled.nav`
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: center;
    `
    const TabButton = Styled(GenericButton)`
      && {
        a {
          border-radius: 0.5rem 0.5rem 0 0;
          :hover {
            svg {
              animation: 0.3s ${keyframes`${fadeInUp}`};
              visibility: visible;
            }
          }
          svg {
            animation: 0.3s ${keyframes`${fadeOutDown}`};
            transition: visibility 0.3s;
            visibility: hidden;
            color: transparent;
          }
        }
        a.active {
          svg {
            animation: none;
            visibility: visible;
          }
        }
      }
    `
    return (
      <NavHeader>
        <GenericButton
          type='action'
          text=''
          icon={['far', 'snowflake']}
          func={this.toggleSnow}
        />
        <Logo size={4}/>
        <NavItems>
          <TabButton
            type='internal'
            to='/articles'
            text='Articles'
            icon={['far', 'comment']}
          />
          <TabButton
            type='internal'
            to='/projects'
            text='Projects'
            icon={['fas', 'code']}
          />
          <TabButton
            type='internal'
            to='/misc'
            text='Misc'
            icon={RandomIcon()}
            isFixedWidth={true}
          />
          <TabButton
            type='internal'
            to='/resume'
            text='Resume'
            icon={['fas', 'paper-plane']}
          />
          <TabButton
            type='internal'
            to='/search'
            text='Search'
            icon={['fas', 'search']}
          />
        </NavItems>
      </NavHeader>
    )
  }
}

export default Header
