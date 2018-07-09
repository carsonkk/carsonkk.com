import React from 'react'
import Styled, { keyframes } from 'styled-components'
import { fadeInUp, fadeOutDown } from 'react-animations'

import Button from '../Button'
import Logo from './Logo'
import { Colors, RandomIcon } from '../../utils/Theme'

class Header extends React.Component {
  render() {
    const NavHeader = Styled.header`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: ${Colors.foreground};
      box-shadow: 0rem 0rem 1.5rem -0.25rem black;
    `
    const NavItems = Styled.nav`
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: center;
    `
    const radius = '0.5rem 0.5rem 0 0'
    const customCss = `
      a {
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
          color: ${Colors.background};
        }
      }
      a.active {
        span > svg {
          animation: none;
          visibility: visible;
        }
      }
    `

    return (
      <NavHeader>
        <Logo size={5}/>
        <NavItems>
          <Button
            type='internal'
            href='/blog'
            icon={['far', 'comment']}
            text='Blog'
            radius={radius}
            css={customCss}
          />
          <Button
            type='internal'
            href='/projects'
            icon={['fas', 'code']}
            text='Projects'
            radius={radius}
            css={customCss}
          />
          <Button
            type='internal'
            href='/misc'
            icon={RandomIcon()}
            text='Misc'
            radius={radius}
            css={customCss}
            fixedWidth={true}
          />
          <Button
            type='internal'
            href='/about'
            icon={['fas', 'tree']}
            text='About'
            radius={radius}
            css={customCss}
          />
          <Button
            type='internal'
            href='/portfolio'
            icon={['fas', 'paper-plane']}
            text='Portfolio'
            radius={radius}
            css={customCss}
          />
        </NavItems>
      </NavHeader>
    )
  }
}

export default Header
