import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Cookies from 'universal-cookie'

import '../css/prism-material.css'
import Header from './Header'
import Footer from './Footer'
import { DarkTheme, LightTheme, MUIBoxShadow } from '../utils/Theme'
import { FontSans, LinkStyle } from '../utils/Text'
import { MediaMin, MediaMax } from '../utils/Responsive';

const cookies = new Cookies()

class BaseLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {theme: cookies.get('theme')}
    this.handleClickTheme = this.handleClickTheme.bind(this)
  }

  handleClickTheme() {
    const initialPos = window.pageYOffset
    const { theme } = this.state
    let newTheme
    if(theme === 'dark') {
      newTheme = 'light'
      cookies.set('theme', newTheme, { path: '/' })
    } else {
      newTheme = 'dark'
      cookies.set('theme', newTheme, { path: '/' })
    }
    this.setState({
      theme: newTheme
    }, () => {window.scrollTo(0, initialPos)})
  }

  render() {
    //const { theme } = this.state
    let theme = 'dark'
    const { children } = this.props
    const BaseWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      height: 100%;
      position: relative;
      z-index: 1;
      font-family: ${FontSans};
      text-align: left;
      box-sizing: border-box;
      color: ${props => props.theme.text};
      background-color: ${props => props.theme.primary};
    `
    const GlobalStyle = createGlobalStyle`
      html {
        font-size: 1em;
        ${MediaMin.s`
          font-size: 1.125em;
        `}
        ${MediaMin.l`
          font-size: 1.25em;
        `}
      }
      body {
        margin: 0;
      }
      body::-webkit-scrollbar,
      body::-webkit-scrollbar-track,
      pre::-webkit-scrollbar,
      pre::-webkit-scrollbar-track {
        background-color: #7a8190;
      }
      pre::-webkit-scrollbar,
      pre::-webkit-scrollbar-track {
        height: 0.5em;
        width: 0.5em;
      }
      body::-webkit-scrollbar-thumb,
      body::-webkit-scrollbar-corner,
      pre::-webkit-scrollbar-thumb,
      pre::-webkit-scrollbar-corner {
        background-color: #c2c8d1;
      }
      h1, h2, h3, h4, h5, h6,
      .hxxl, .hxl, .hl, .hm, .hx, .hxs {
        display: block;
        margin-top: 0;
        font-family: ${FontSans};
        font-weight: bold;
        line-height: 1;
        :hover {
          a.anchor svg {
            visibility: visible;
            fill: ${props => props.theme.text};
            ${MediaMax.xs`
              visibility: hidden;
            `}
          }
        }
        a.anchor svg {
          transition: all 0.3s;
          visibility: hidden;
          fill: transparent;
        }
      }
      h1, .hxxl {
        font-size: 3em;
        margin-bottom: 0.5em;
        > a.anchor {
          margin-left: -1em;
          padding-right: 0.25em;
          svg {
            height: 0.75em;
            width: 0.75em;
          }
        }
      }
      h2, .hxl {
        font-size: 2.5em;
        margin-bottom: 0.4em;
        > a.anchor {
          margin-left: -1em;
          padding-right: 0.25em;
          svg {
            height: 0.75em;
            width: 0.75em;
          }
        }
      }
      h3, .hl {
        font-size: 2.125em;
        margin-bottom: 0.3em;
        > a.anchor {
          margin-left: -1em;
          padding-right: 0.25em;
          svg {
            height: 0.75em;
            width: 0.75em;
          }
        }
      }
      h4, .hm {
        font-size: 1.75em;
        margin-bottom: 0.2em;
        > a.anchor {
          margin-left: -1em;
          padding-right: 0.25em;
          svg {
            height: 0.75em;
            width: 0.75em;
          }
        }
      }
      h5, .hs {
        font-size: 1.375em;
        margin-bottom: 0.2em;
        > a.anchor {
          margin-left: -1em;
          padding-right: 0.25em;
          svg {
            height: 0.75em;
            width: 0.75em;
          }
        }
      }
      h6, .hxs {
        font-size: 1em;
        margin-bottom: 0.2em;
        > a.anchor {
          margin-left: -1em;
          padding-right: 0.25em;
          svg {
            height: 0.75em;
            width: 0.75em;
          }
        }
      }
      p, li {
        line-height: 1.5;
      }
      p, li {
        ${LinkStyle}
        a {
          transition: all 0.3s;
          color: ${props => props.theme.color};
          :hover {
            color: ${props => props.theme.accent};
          }
          ::before {
            background-color: ${props => props.theme.accent};
          }
        }
      }
      a {
        text-decoration: none;
        color: ${props => props.theme.text};
        .anchor svg {
          fill: ${props => props.theme.text};
        }
        :focus {
          outline: none;
          border: 0;
        }
      }
      button {
        ::-moz-focus-inner {
          outline: none;
          border: 0;
        }
      }
      ul, ol {
        padding-left: 1.375em;
      }
      .footnotes > ol > li > p {
        display: inline;
      }
      li > p {
        margin: 0;
      }
      hr {
        width: 100%;
      }
      blockquote {
        position: relative;
        margin: 1em 0 3.25em 0;
        font-style: italic;
        color: ${props => props.theme.caption};
        ::before, ::after {
          display: inline-block;
          height: 0.25em;
          vertical-align: top;
          font-size: 8em;
          line-height: 0.85;
        }
        ::before {
          content: '“';
        }
        ::after {
          content: '”';
          position: absolute;
          right: 0;
          margin-right: 0.2em;
          line-height: 0.8;
        }
        p {
          margin: 0 2.25em 0 2em;
          font-size: 1.5em;
          text-align: justify;
        }
      }
      table {
        width: 100%;
        margin: 1em 0;
        border-spacing: 0;
        border-radius: 0.5em;
        box-shadow: ${MUIBoxShadow};
        th, td {
          padding: 0.5em;
        }
        th {
          padding-top: 0.75em;
          padding-bottom: 0.75em;
          color: ${DarkTheme.text};
          background-color: ${props => props.theme.color};
          :first-child {
            border-top-left-radius: 0.5em;
          }
          :last-child {
            border-top-right-radius: 0.5em;
          }
        }
        tr {
          :nth-child(even) {
            background-color: ${props => props.theme.secondary};
          }
          :last-child {
            td {
              :first-child {
                border-bottom-left-radius: 0.5em;
              }
              :last-child {
                border-bottom-right-radius: 0.5em;
              }
            }
          }
        }
      }
      .footnotes {
        p {
          display: inline-block;
        }
        .footnote-backref {
          margin-left: 0.5em;
          vertical-align: middle;
        }
      }
      .gatsby-resp-image-wrapper {
        border-radius: 0.5em;
        .gatsby-resp-image-image {
          border-radius: 0.5em;
        }
      }
      .gatsby-resp-image-wrapper, .gatsby-resp-iframe-wrapper, .gatsby-highlight {
        box-shadow: ${MUIBoxShadow};
      }
    `
    const MainWrapper = Styled.main`
      flex: 1 1 auto;
      display: flex;
    `
    return(
      <StaticQuery
        query={graphql`
        {
          site {
            siteMetadata {
              title
              author
              description
              siteUrl
            }
          }
          allSocialJson {
            edges {
              node {
                ...FooterFragment
              }
            }
          }
        }
      `}
        render={data => (
          <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
            <BaseWrapper>
              <GlobalStyle/>
              <Header/>
              <MainWrapper>
                {children}
              </MainWrapper>
              <Footer
                links={data.allSocialJson.edges}
                theme={theme}
                handleClickTheme={this.handleClickTheme}
              />
            </BaseWrapper>
          </ThemeProvider>
        )}
      />
    )
  }
}

export default BaseLayout