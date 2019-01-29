import React from 'react'
import Styled, { keyframes, withTheme } from 'styled-components'
import { fadeInUp, fadeOutDown } from 'react-animations'
import Cookies from 'universal-cookie'

import '../css/header.css'
import snowstorm from '../js/snowstorm.js'
import GenericButton from './GenericButton'
import Logo from './Logo'
import { MinWidth } from '../utils/Container'
import { RandomIcon } from '../utils/Theme'

const cookies = new Cookies()

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 1920,
      menu: false,
      snow: (cookies.get('snow') === 'true')
    }
    this.resize = this.resize.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.toggleSnow = this.toggleSnow.bind(this)
  }

  componentDidMount() {
    this.resize()
    if(!this.state.snow) {
      snowstorm.start()
      snowstorm.active = !snowstorm.active
      snowstorm.stop()
      snowstorm.freeze()
    }
    window.addEventListener("resize", this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize)
  }

  resize() {
    this.setState({
      width: window.innerWidth
    })
  }

  toggleMenu() {
    this.setState(prevState => ({menu: !prevState.menu}))
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
    const now = new Date()
    const currentMonth = now.getMonth()+1
    const HeaderWrapper = Styled.header`
      flex: 0 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      z-index: 1000;
      background-color: ${props => props.theme.secondary};
      box-shadow: 0 0 1rem 0 black;
    `
    const SnowButton = Styled(GenericButton)`
      && {
        position: absolute;
        top: 0;
        left: 0;
        visibility: ${currentMonth !== 12 ? 'hidden' : 'visible'};
        margin: ${this.state.width <= MinWidth.s ? '1em 0 0 1rem' : '0.5rem 0 0 0.5rem'};
        button svg {
          font-size: ${this.state.width <= MinWidth.s ? '2.5rem' : '2rem'};
        }
      }
    `
    const MobileMenuButton = Styled(GenericButton)`
      && {
        position: ${this.state.menu ? 'fixed' : 'absolute'};
        top: 0;
        right: 0;
        z-index: 10010;
        margin: 1rem 1rem 0 0;
        button {
          :hover {
            background-color: transparent;
            svg {
              color: ${props => props.theme.caption};
            }
          }
          svg {
            font-size: ${this.state.menu ? '3rem' : '2.5rem'};
          }
        }
      }
    `
    const MobileButtonWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    `
    const PCButtonWrapper = Styled.nav`
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
    const MenuButton = Styled(GenericButton)`
      && {
        width: 100%;
        a {
          padding: 2rem calc(100% - 1rem) 2rem 1rem;
          border-radius: 0;
          font-size: 2.5rem;
          svg {
            font-size: 2.5rem;
          }
        }
      }
    `

    return (
      <div style={{backgroundColor: this.props.theme.secondary}}>
        {this.state.width <= MinWidth.s &&
          <MobileMenuButton
            type='action'
            text=''
            icon={this.state.menu? ['fas', 'times'] : ['fas', 'bars']}
            func={this.toggleMenu}
          />
        }
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
              icon={RandomIcon()}
              isFixedWidth={true}
            />
            <MenuButton
              type='internal'
              to='/resume'
              text='Resume'
              icon={['fas', 'paper-plane']}
            />
            <MenuButton
              type='internal'
              to='/search'
              text='Search'
              icon={['fas', 'search']}
            />
          </MobileButtonWrapper>
        </div>
        <HeaderWrapper>
          <SnowButton
            type='action'
            text=''
            icon={['far', 'snowflake']}
            func={this.toggleSnow}
            active={this.state.snow ? 'active' : ''}
          />
          <Logo size={4}/>
          {this.state.width > MinWidth.s &&
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
            </PCButtonWrapper>
          }
        </HeaderWrapper>
      </div>
    )
  }
}

export default withTheme(Header)
