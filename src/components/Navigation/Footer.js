import React from 'react'
import Styled from 'styled-components'

import Logo from './Logo'
import Button from '../Button'
import Social from '../../utils/Social'
import { Colors } from '../../utils/Theme'

class Footer extends React.Component {
  render() {
    let socialLinks = []
    let customCss
    const NavFooter = Styled.footer`
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 1;
      padding-top: 4rem;
      padding-bottom: 1rem;
      background-color: ${Colors.background};
    `
    const NavHome = Styled.div`
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;

      > div:first-child, > div:last-child {
        flex: 1;
        align-self: center;
        height: 0.125rem;
        margin: 0 1rem;
        background-color: ${Colors.text};
      }
    `
    const NavItems = Styled.nav`
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin: 0;
      padding: 0;
    `
    for(let i in Social) {
      customCss = `
        a {
          margin: 0 0.5rem;
          padding: 0.25rem 0.125rem;

          :hover {
            span > svg {
              color: ${Social[i].color};
            }
          }
          span > svg {
            vertical-align: middle;
            font-size: 2rem;
          }
        }
      `
      socialLinks.push(
        <Button key={i}
          type='external'
          href={Social[i].href}
          title={Social[i].title}
          icon={Social[i].icon}
          css={customCss}
          fixedWidth={true}
        />
      )
    }

    return (
      <NavFooter>
        <div>
          <NavHome>
            <div></div>
            <Logo size={2}/>
            <div></div>
          </NavHome>
          <NavItems>
            {socialLinks}
          </NavItems>
        </div>
      </NavFooter>
    )
  }
}

export default Footer