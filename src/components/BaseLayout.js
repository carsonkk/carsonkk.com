import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Cookies from 'universal-cookie'
import '@fortawesome/fontawesome-svg-core/styles.css' // ensure CSS is loaded pre-render for Firefox

import '../css/prism-atom-dark.css'
import Header from './Header'
import Footer from './Footer'
import { DarkTheme, LightTheme, MUIBoxShadow } from '../utils/Theme'
import { FontSans, LinkStyle } from '../utils/Text'
import { MediaMin, MediaMax } from '../utils/Responsive';

const cookies = new Cookies()

class BaseLayout extends React.Component {
  constructor(props) {
    super(props)
    const theme = cookies.get('theme')
    this.state = {theme: theme}
    this.handleClickTheme = this.handleClickTheme.bind(this)
  }

  handleClickTheme() {
    const initialPos = window.pageYOffset
    let newTheme
    this.setState((prevState) => {
      if(prevState.theme === 'dark') {
        newTheme = 'light'
        cookies.set('theme', newTheme, { path: '/' })
      } else {
        newTheme = 'dark'
        cookies.set('theme', newTheme, { path: '/' })
      }
      return {
        theme: newTheme
      }
    }, () => {window.scrollTo(0, initialPos)})
  }

  render() {
    const { theme } = this.state
    const { children } = this.props
    const themeVals = theme === 'light' ? LightTheme : DarkTheme 
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
      color: ${themeVals.text};
      background-color: ${themeVals.primary};
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
            fill: ${themeVals.text};
            ${MediaMax.xs`
              visibility: hidden;
            `}
          }
        }
        > a.anchor {
          margin-left: -1em;
          padding-right: 0.25em;
          svg {
            transition: all 0.3s;
            visibility: hidden;
            fill: transparent;
            height: 0.75em;
            width: 0.75em;
          }
        }
      }
      h1, .hxxl {
        font-size: 3em;
        margin-bottom: 0.5em;
      }
      h2, .hxl {
        font-size: 2.375em;
        margin-bottom: 0.4em;
      }
      h3, .hl {
        font-size: 2em;
        margin-bottom: 0.3em;
      }
      h4, .hm {
        font-size: 1.625em;
        margin-bottom: 0.2em;
      }
      h5, .hs {
        font-size: 1.375em;
        margin-bottom: 0.2em;
      }
      h6, .hxs {
        font-size: 1.125em;
        margin-bottom: 0.2em;
      }
      p, li {
        line-height: 1.5;
      }
      p, li, td {
        ${LinkStyle}
        a {
          transition: all 0.3s;
          color: ${themeVals.color};
          :hover {
            color: ${themeVals.accent};
          }
          ::before {
            background-color: ${themeVals.accent};
          }
        }
      }
      a {
        text-decoration: none;
        color: ${themeVals.text};
        .anchor svg {
          fill: ${themeVals.text};
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
        color: ${themeVals.caption};
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
          background-color: ${themeVals.color};
          :first-child {
            border-top-left-radius: 0.5em;
          }
          :last-child {
            border-top-right-radius: 0.5em;
          }
        }
        tr {
          :nth-child(even) {
            background-color: ${themeVals.secondary};
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
      .react-select-base {
        width: 100%;
      }
      .imgur {
        :hover::before {
          visibility: hidden;
          transform: none;
        }
        img {
          width: 100%;
          margin-top: 1em;
          border-radius: 0.5em;
        }
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
          <ThemeProvider theme={themeVals}>
            <BaseWrapper>
              <GlobalStyle/>
              <Header/>
              <MainWrapper>
                {children}
              </MainWrapper>
              <Footer
                links={data.allSocialJson.edges}
                theme={theme}
                themeVals={themeVals}
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