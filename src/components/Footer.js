import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Styled from 'styled-components'
import { Flex } from '@rebass/grid'

import Logo from './Logo'
import GenericButton from './GenericButton'
import { LightTheme } from '../utils/Theme'
import { ResMinWidthPx } from '../utils/Responsive'

class Footer extends React.Component {
  render() {
    const { links, theme, handleClickTheme } = this.props

    const FooterWrapper = Styled.footer`
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 100;
      padding-top: 4em;
      background-color: ${props => props.theme.primary};
    `
    const NavWrapper = Styled(Flex)`
      width: 100%;
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
      padding-left: 1em;
    `
    const RightNavWrapper = Styled.div`
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      align-content: flex-end;
      padding-right: 1em;
    `
    const CenterNavWrapper = Styled.div`
      display: flex;
      flex-direction: column;
    `
    const Line = Styled.div`
      flex: 1;
      align-self: center;
      height: 0.125em;
      margin: 0 1em;
      background-color: ${props => props.theme.text};
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
          margin: 0 0.5em;
          padding: 0.25em 0.125em;
          :hover {
            background-color: transparent;
            svg {
              color: ${LightTheme.github};
            }
          }
          svg {
            vertical-align: middle;
            font-size: 1.75em;
          }
        }
      }
    `
    const ThemeButton = Styled(GenericButton)`
      && {
        button {
          margin: 0 0.5em;
          padding: 0.25em 0.125em;
          :hover {
            background-color: transparent;
            svg {
              color: ${props => props.theme.toggle};
            }
          }
          svg {
            vertical-align: middle;
            font-size: 1.75em;
          }
        }
      }
    `
    let socials = links.map((link, i) => {
      const { node } = link
      const SocialButton = Styled(GenericButton)`
        && {
          line-height: 1.75;
          a {
            margin: 0 0.5em;
            padding: 0.25em 0.125em;
            :hover {
              background-color: ${props => props.theme.social};
              svg {
                color: ${node.name === 'github' ? props => props.theme.github : node.color};
              }
            }
            svg {
              vertical-align: middle;
              font-size: 1.75em;
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
    const len = socials.length
    const mod = len%3
    const baseWidth = [1/3, 1/3, 1/len]
    socials = socials.map((social, i) => {
      let width = baseWidth
      if(i >= len-2) {
        if(i === len-2) {
          switch (mod) {
            case 2:
              width = [1/2, 1/2, 1/len]
              break;
            default:
              break;
          }
        }
        else if(i === len-1) {
          switch(mod) {
            case 1:
              width = [1, 1, 1/len]
              break;
            case 2:
              width = [1/2, 1/2, 1/len]
              break;
            default:
              break;
          }
        }
      }
      return(
        <Flex key={i} justifyContent="center" width={width} mb={[4, 4, 0]}>
          {social}
        </Flex>
      )
    })
    const secrets = [
      <Flex key={0} justifyContent={["center", "center", "flex-start"]} width={1/2} pl={[0, 0, 2]} mb={[4, 4, 0]}>
        <GithubButton
          type='external'
          to='https://github.com/carsonkk/carsonkk.com'
          title={'Check out this site on GitHub!'}
          icon={['fas', 'code-branch']}
          isFixedWidth={true}
        />
      </Flex>,
      <Flex key={1} justifyContent={["center", "center", "flex-end"]} width={1/2} pr={[0, 0, 2]} mb={[4, 4, 0]}>
        <ThemeButton
          type='action'
          title={theme === 'dark' ? 'Brighter than a thousand suns...' : 'My eyes, they burn! Go back!'}
          icon={theme === 'dark' ? ['fas', 'moon'] : ['fas', 'sun']}
          func={handleClickTheme}
          isFixedWidth={true}
        />
      </Flex>
    ]

    return (
      <FooterWrapper>
        <NavWrapper flexDirection="column" justifyContent="center" width={[1, 1, "38em"]} mb={[0, 0, "-56px"]}>
          <Flex justifyContent="center" mx={4} mb={[4, 4, 3]}>
            <Line/>
            <Logo size={2.5}/>
            <Line/>
          </Flex>
          <Flex flexWrap="wrap" justifyContent="center" mx={4}>
            {socials}
          </Flex>
        </NavWrapper>
        <Flex justifyContent="center" width={[1, 1, 0]} px={4} mb={[4, 4, 0]}>
          <Line/>
        </Flex>
        <Flex flexWrap="wrap" width={[1]} px={[4, 4, 0]} mb={[0, 0, 3]}>
          {secrets}
        </Flex>
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
