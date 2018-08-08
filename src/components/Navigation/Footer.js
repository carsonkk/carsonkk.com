import React from 'react'
import Styled from 'styled-components'

import Logo from './Logo'
import Button from '../Button'

class Footer extends React.Component {
  render() {
    const NavFooter = Styled.footer`
      flex: 0 1 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 1;
      padding-top: 4rem;
      background-color: ${props => props.theme.primary};
      > div {
        display: flex;
        justify-content: center;
        width: 100%;
        padding-bottom: 1rem;
        :hover {
          > span {
            opacity: 1;
          }
        }
        > span {
          transition: all 0.3s;
          opacity: 0;
        }
      }
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
        background-color: ${props => props.theme.text};
      }
    `
    const NavItems = Styled.nav`
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin: 0;
      padding: 0;
    `
    const ThemeButton = Styled(Button)`
      && {
        position: absolute;
        bottom: 0;
        right: 0;
        padding-bottom: 1rem;
        button {
          margin: 0 0.5rem;
          padding: 0.25rem 0.125rem;
          :hover {
            background-color: transparent;
            span > svg {
              color: ${props => props.theme.toggle};
            }
          }
          span > svg {
            vertical-align: middle;
            font-size: 2rem;
          }
        }
      }
    `
    const items = this.props.links.map((link, i) => {
      const { node } = link
      const SocialButton = Styled(Button)`
        && {
          a {
            margin: 0 0.5rem;
            padding: 0.25rem 0.125rem;
            :hover {
              background-color: ${props => props.theme.social};
              span > svg {
                color: ${node.color};
              }
            }
            span > svg {
              vertical-align: middle;
              font-size: 2rem;
            }
          }
        }
      `
      return (
        <SocialButton 
          key={i}
          type='external'
          href={node.url}
          title={node.text}
          icon={node.icon}
          fixedWidth={true}
        />
      )
    })

    return (
      <NavFooter>
        <div>
          <div>
            <div>
              <NavHome>
                <div></div>
                <Logo size={2}/>
                <div></div>
              </NavHome>
              <NavItems>
                {items}
              </NavItems>
            </div>
          </div>
          <ThemeButton
            type='action'
            icon={this.props.isDarkTheme ? ['fas', 'moon'] : ['fas', 'sun']}
            title={this.props.isDarkTheme ? 'brighter than a thousand suns...' : 'my eyes, they burn! go back!'}
            func={this.props.handleClickTheme}
            fixedWidth={true}
          />
        </div>
      </NavFooter>
    )
  }
}

export default Footer
