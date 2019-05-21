import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Styled from 'styled-components'
import { Flex } from '@rebass/grid'

import Logo from './Logo'
import GenericButton from './GenericButton'
import { LightTheme } from '../utils/Theme'
import { MediaMin } from '../utils/Responsive'

class Footer extends React.Component {
  render() {
    const { links, theme, themeVals, handleClickTheme } = this.props
    const articleRgx = /\/articles\/.+?/g
    const FooterWrapper = Styled.footer`
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 100;
      padding-top: 6em;
      background-color: ${themeVals.primary};
      ${typeof window !== `undefined` && `
        box-shadow: ${articleRgx.test(window.location.href) ? '0em 0em 1.5em -0.25em black' : 'none'};
      `}
      ${MediaMin.s`
        :hover {
          > div:last-child {
            opacity: 1;
          }
        }
        > div:last-child {
          transition: all 0.3s;
          opacity: 0;
        }
      `}
    `
    const NavWrapper = Styled(Flex)`
      width: 100%;
      position: relative;
      z-index: 2;
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
    const Line = Styled.div`
      flex: 1;
      align-self: center;
      height: 0.125em;
      margin: 0 1em;
      background-color: ${themeVals.text};
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
            ${MediaMin.s`
              font-size: 1.5em;
            `}
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
              color: ${themeVals.toggle};
            }
          }
          svg {
            vertical-align: middle;
            font-size: 1.75em;
            ${MediaMin.s`
              font-size: 1.5em;
            `}
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
              background-color: ${themeVals.social};
              svg {
                color: ${node.name === 'github' ? themeVals.github : node.color};
              }
            }
            svg {
              vertical-align: middle;
              font-size: 1.75em;
              ${MediaMin.s`
                font-size: 1.5em;
              `}
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
          title={theme === 'light' ? 'My eyes, they burn! Go back!' : 'Brighter than a thousand suns...'}
          icon={theme === 'light' ? ['fas', 'sun'] : ['fas', 'moon']}
          func={handleClickTheme}
          isFixedWidth={true}
          dataAttr={theme}
        />
      </Flex>
    ]

    return (
      <FooterWrapper>
        <NavWrapper flexDirection="column" justifyContent="center" width={[1, 1, "38em"]} mb={[0, 0, "-56px"]}>
          <Flex justifyContent="center" mx={4} mb={[4, 4, 3]}>
            <Line/>
            <Logo size={2}/>
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
  themeVals: PropTypes.object.isRequired,
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
