import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Cookies from 'universal-cookie'

import '../css/prism-material.css'
import Header from './Header'
import Footer from './Footer'
import { DarkTheme, LightTheme, MUIBoxShadow } from '../utils/Theme'
import { FontSans, LinkStyle } from '../utils/Text'

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
    const { theme } = this.state
    const { children } = this.props
    const BaseWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      height: 100%;
      position: relative;
      z-index: 1;
      font-family: ${FontSans};
      font-size: 1.25rem;
      line-height: 1.5;
      text-align: left;
      box-sizing: border-box;
      color: ${props => props.theme.text};
      background-color: ${props => props.theme.primary};
    `
    const GlobalStyle = createGlobalStyle`
      body {
        margin: 0;
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
        padding-left: 1.375rem;
      }
      li > p {
        margin: 0;
      }
      blockquote {
        position: relative;
        margin: 0 0 2.5em 0;
        font-style: italic;
        color: ${props => props.theme.caption};
        ::before, ::after {
          display: inline-block;
          height: 1rem;
          vertical-align: top;
          font-size: 8rem;
          line-height: 0.775;
        }
        ::before {
          content: '“';
        }
        ::after {
          content: '”';
          position: absolute;
          right: 0;
          margin-right: 1.5rem;
        }
        p {
          margin: 0 2rem;
          font-size: 1.75rem;
          text-align: justify;
        }
      }
      table {
        width: 100%;
        border-spacing: 0;
        border-radius: 0.5em;
        box-shadow: ${MUIBoxShadow};
        th, td {
          padding: 0.5rem;
        }
        th {
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
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
          margin-left: 0.5rem;
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
      h1, h2, h3, h4, h5, h6 {
        font-family: ${FontSans};
        line-height: 1;
        :hover {
          a.anchor svg {
            fill: ${props => props.theme.text};
          }
        }
        a.anchor svg {
          transition: all 0.3s;
          fill: transparent;
        }
      }
      h1 {
        font-size: 3em;
        > a.anchor {
          margin-left: -3rem;
          padding-right: 0.5rem;
          svg {
            height: 2.5rem;
            width: 2.5rem;
          }
        }
      }
      h2 {
        font-size: 2.5em;
        > a.anchor {
          margin-left: -2.375rem;
          padding-right: 0.5rem;
          svg {
            height: 1.875rem;
            width: 1.875rem;
          }
        }
      }
      h3 {
        font-size: 2.125em;
        > a.anchor {
          margin-left: -1.9375rem;
          padding-right: 0.5rem;
  
          svg {
            height: 1.4375rem;
            width: 1.4375rem;
          }
        }
      }
      h4 {
        font-size: 1.75em;
        > a.anchor {
          margin-left: -1.75rem;
          padding-right: 0.5rem;
  
          svg {
            height: 1.25rem;
            width: 1.25rem;
          }
        }
      }
      h5 {
        font-size: 1.375em;
        > a.anchor {
          margin-left: -1.5rem;
          padding-right: 0.5rem;
  
          svg {
            height: 1rem;
            width: 1rem;
          }
        }
      }
      h6 {
        font-size: 1em;
        > a.anchor {
          margin-left: -1.3125rem;
          padding-right: 0.5rem;
  
          svg {
            height: 0.8125rem;
            width: 0.8125rem;
          }
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