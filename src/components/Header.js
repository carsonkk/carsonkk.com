import React from 'react'
import Styled, { keyframes } from 'styled-components'
import { fadeInUp, fadeOutDown } from 'react-animations'

import GenericButton from './GenericButton'
import Logo from './Logo'
import { RandomIcon } from '../utils/Theme'


class Header extends React.Component {
  render() {
    const NavHeader = Styled.header`
      flex: 0 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      z-index: 100;
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
            color: ${props => props.theme.primary};
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
        <Logo size={4}/>
        <NavItems>
          <TabButton
            type='internal'
            to='/blog'
            text='Blog'
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
            to='/about'
            text='About'
            icon={['fas', 'tree']}
          />
          <TabButton
            type='internal'
            to='/resume'
            text='Resume'
            icon={['fas', 'paper-plane']}
          />
        </NavItems>
      </NavHeader>
    )
  }
}

export default Header
