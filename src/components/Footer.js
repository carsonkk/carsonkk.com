import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

import Logo from './Logo'
import GenericButton from './GenericButton'


class Footer extends React.Component {
  render() {
    const { links, isDarkTheme, handleClickTheme } = this.props

    const FooterWrapper = Styled.footer`
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      z-index: 100;
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
    const ThemeButton = Styled(GenericButton)`
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
            svg {
              color: ${props => props.theme.toggle};
            }
          }
          svg {
            vertical-align: middle;
            font-size: 2rem;
          }
        }
      }
    `
    
    const items = links.map((link, i) => {
      const { node } = link
      const SocialButton = Styled(GenericButton)`
        && {
          a {
            margin: 0 0.5rem;
            padding: 0.25rem 0.125rem;
            :hover {
              background-color: ${props => props.theme.social};
              svg {
                color: ${node.color};
              }
            }
            svg {
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
          to={node.url}
          title={node.text}
          icon={node.icon}
          isFixedWidth={true}
        />
      )
    })

    return (
      <FooterWrapper>
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
            title={isDarkTheme ? 'brighter than a thousand suns...' : 'my eyes, they burn! go back!'}
            icon={isDarkTheme ? ['fas', 'moon'] : ['fas', 'sun']}
            func={handleClickTheme}
            isFixedWidth={true}
          />
        </div>
      </FooterWrapper>
    )
  }
}

Footer.propTypes = {
  links: PropTypes.array.isRequired,
  handleClickTheme: PropTypes.func.isRequired,
  isDarkTheme: PropTypes.bool.isRequired
}

export default Footer
