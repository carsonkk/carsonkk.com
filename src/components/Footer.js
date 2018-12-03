import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Styled from 'styled-components'

import Logo from './Logo'
import GenericButton from './GenericButton'
import { LightTheme } from '../utils/Theme'

class Footer extends React.Component {
  render() {
    const { links, theme, handleClickTheme } = this.props

    const FooterWrapper = Styled.footer`
      display: flex;
      position: relative;
      z-index: 100;
      padding-top: 4rem;
      background-color: ${props => props.theme.primary};
    `
    const NavWrapper = Styled.div`
      display: flex;
      justify-content: center;
      width: 100%;
      padding-bottom: 1.5rem;
      :hover {
        > div:first-child, > div:last-child {
          > span {
            opacity: 1;
          }
        }
      }
      > div:first-child, > div:last-child {
        > span {
          transition: all 0.3s;
          opacity: 0;
        }
      }
    `
    const LeftNavWrapper = Styled.div`
      flex: 1;
      display: flex;
      align-items: flex-end;
      align-content: flex-end;
      padding-left: 1rem;
    `
    const RightNavWrapper = Styled.div`
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      align-content: flex-end;
      padding-right: 1rem;
    `
    const CenterNavWrapper = Styled.div`
      display: flex;
      flex-direction: column;
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
      justify-content: center;
      margin: 0;
      padding: 0;
    `
    const GithubButton = Styled(GenericButton)`
      && {
        a {
          margin: 0 0.5rem;
          padding: 0.25rem 0.125rem;
          :hover {
            background-color: transparent;
            svg {
              color: ${LightTheme.github};
            }
          }
          svg {
            vertical-align: middle;
            font-size: 2rem;
          }
        }
      }
    `
    const ThemeButton = Styled(GenericButton)`
      && {
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
          line-height: 1.75;
          a {
            margin: 0 0.5rem;
            padding: 0.25rem 0.125rem 0.5rem 0.125rem;
            :hover {
              background-color: ${props => props.theme.social};
              svg {
                color: ${node.name === 'github' ? props => props.theme.github : node.color};
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
        <NavWrapper>
          <LeftNavWrapper>
            <GithubButton
              type='external'
              to='https://github.com/carsonkk/carsonkk.com'
              title={'Check out this site on GitHub!'}
              icon={['fab', 'github-alt']}
              isFixedWidth={true}
            />
          </LeftNavWrapper>
          <CenterNavWrapper>
            <NavHome>
              <div/>
              <Logo size={2}/>
              <div/>
            </NavHome>
            <NavItems>
              {items}
            </NavItems>
          </CenterNavWrapper>
          <RightNavWrapper>
            <ThemeButton
              type='action'
              title={theme === 'dark' ? 'Brighter than a thousand suns...' : 'My eyes, they burn! Go back!'}
              icon={theme === 'dark' ? ['fas', 'moon'] : ['fas', 'sun']}
              func={handleClickTheme}
              isFixedWidth={true}
            />
          </RightNavWrapper>
        </NavWrapper>
      </FooterWrapper>
    )
  }
}

Footer.propTypes = {
  links: PropTypes.array.isRequired,
  theme: PropTypes.string.isRequired,
  handleClickTheme: PropTypes.func.isRequired
}

export default Footer

export const componentQuery = graphql`
  fragment FooterFragment on SocialJson {
    name
    url
    text
    color
    icon
  }
`