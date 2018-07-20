import React from 'react'
import Styled, { keyframes } from 'styled-components'
import { fadeInUp, fadeOutDown } from 'react-animations'

import Button from '../Button'
import Logo from './Logo'
import { RandomIcon } from '../../utils/Theme'

class Header extends React.Component {
  render() {
    const NavHeader = Styled.header`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 100;
      background-color: ${props => props.theme.secondary};
      box-shadow: 0rem 0rem 1.5rem -0.25rem black;
    `
    const NavItems = Styled.nav`
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: center;
    `
    const TabButton = Styled(Button)`
      && {
        a {
          border-radius: 0.5rem 0.5rem 0 0;
          :hover {
            span > svg {
              animation: 0.3s ${keyframes`${fadeInUp}`};
              visibility: visible;
            }
          }
          span > svg {
            animation: 0.3s ${keyframes`${fadeOutDown}`};
            transition: visibility 0.3s;
            visibility: hidden;
            color: ${props => props.theme.primary};
          }
        }
        a.active {
          span > svg {
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
            href='/blog'
            icon={['far', 'comment']}
            text='Blog'
          />
          <TabButton
            type='internal'
            href='/projects'
            icon={['fas', 'code']}
            text='Projects'
          />
          <TabButton
            type='internal'
            href='/misc'
            icon={RandomIcon()}
            text='Misc'
            fixedWidth={true}
          />
          <TabButton
            type='internal'
            href='/about'
            icon={['fas', 'tree']}
            text='About'
          />
          <TabButton
            type='internal'
            href='/resume'
            icon={['fas', 'paper-plane']}
            text='Resume'
          />
        </NavItems>
      </NavHeader>
    )
  }
}

export default Header
