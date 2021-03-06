import React from 'react'
import Styled, { keyframes, withTheme } from 'styled-components'
import { fadeInUp, fadeOutDown } from 'react-animations'

import lights from '../images/christmas-lights.png'
import '../css/header.css'
import GenericButton from './GenericButton'
import Logo from './Logo'
import { MediaMin } from '../utils/Responsive'
import { RandomIcon } from '../utils/Theme'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      miscIcon: RandomIcon()
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState(prevState => ({menu: !prevState.menu}))
  }

  render() {
    const { menu, miscIcon } = this.state
    const now = new Date()
    const currentMonth = now.getMonth()+1

    const HeaderWrapper = Styled.header`
      flex: 0 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      position: ${menu ? 'fixed' : 'relative'};
      z-index: 1002;
      background-color: ${props => props.theme.secondary};
      box-shadow: 0 0 1em 0 black;
    `
    const MobileMenuButton = Styled(GenericButton)`
      && {
        display: block;
        ${MediaMin.s`
          display: none;
        `}
        position: ${this.state.menu ? 'fixed' : 'absolute'};
        top: 0;
        right: 0;
        z-index: 1003;
        margin: 0.5em 0.5em 0 0;
        button {
          :hover {
            background-color: transparent;
            svg {
              color: ${props => props.theme.caption};
            }
          }
          svg {
            font-size: ${this.state.menu ? '3em' : '2.5em'};
          }
        }
      }
    `
    const MobileButtonWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      position: relative;
    `
    const PCButtonWrapper = Styled.nav`
      display: none;
      ${MediaMin.s`
        display: flex;
        flex: 1;
        justify-content: center;
      `}
    `
    const TabButton = Styled(GenericButton)`
      && {
        a {
          border-radius: 0.25em 0.25em 0 0;
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
    const MenuButton = Styled(GenericButton)`
      && {

        width: 100%;
        a {
          padding: 0.75em calc(100% - 0.5em) 0.75em 0.5em;
          border-radius: 0;
          font-size: 2em;
          svg {
            font-size: 1em;
          }
        }
      }
    `
    const Lights = Styled.div`
      position: absolute;
      z-index: 1002;
      width: 100%;
      height: 50px;
      margin-top: -25px;
      background-image: url(${lights});
      background-position: center center;
      background-repeat: repeat;
      background-size: contain;
    `

    return (
      <div style={{backgroundColor: this.props.theme.secondary}}>
        <MobileMenuButton
          type='action'
          text=''
          icon={this.state.menu? ['fas', 'times'] : ['fas', 'bars']}
          func={this.toggleMenu}
        />
        <div className={`${this.state.menu ? 'fullscreen-menu show' : 'fullscreen-menu'}`}>
          <MobileButtonWrapper>
            <MenuButton
              type='internal'
              to='/articles'
              text='Articles'
              icon={['far', 'comment']}
            />
            <MenuButton
              type='internal'
              to='/projects'
              text='Projects'
              icon={['fas', 'code']}
            />
            <MenuButton
              type='internal'
              to='/misc'
              text='Misc'
              icon={miscIcon}
              isFixedWidth={true}
            />
            <MenuButton
              type='internal'
              to='/search'
              text='Search'
              icon={['fas', 'search']}
            />
            <MenuButton
              type='router'
              to='/resume'
              text='Resume'
              icon={['fas', 'paper-plane']}
            />
          </MobileButtonWrapper>
        </div>
        <HeaderWrapper>
          <Logo size={4}/>
          <PCButtonWrapper>
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
              icon={miscIcon}
              isFixedWidth={true}
            />
            <TabButton
              type='internal'
              to='/search'
              text='Search'
              icon={['fas', 'search']}
            />
            <TabButton
              type='router'
              to='/resume'
              text='Resume'
              icon={['fas', 'paper-plane']}
            />
          </PCButtonWrapper>
        </HeaderWrapper>
        <div style={{paddingTop: menu ? '104px' : '0px'}}></div>
        {currentMonth == 12 && 
          <Lights></Lights>
        }
      </div>
    )
  }
}

export default withTheme(Header)
