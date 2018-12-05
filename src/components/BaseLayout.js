import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Cookies from 'universal-cookie'

import '../css/prism-material.css'
import Header from './Header'
import Footer from './Footer'
import { DarkTheme, LightTheme } from '../utils/Theme'
import { FontSans, LinkStyle } from '../utils/Text'

const cookies = new Cookies()

export default class BaseLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {theme: cookies.get('theme')}
    this.handleClickTheme = this.handleClickTheme.bind(this)
  }

  handleClickTheme() {
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
    })
  }

  render() {
    const { theme } = this.state
    const { children, location } = this.props
    const GlobalStyle = createGlobalStyle`
      body {
        margin: 0;
      }
      h1, h2, h3, h4, h5, h6 {
        font-family: ${FontSans};
        line-height: 1;
      }
      blockquote {
        margin: 0;
      }
      li > p {
        margin: 0;
      }
      a {
        text-decoration: none;
        color: ${props => props.theme.text};
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
    `
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
              url
            }
          }
          siteSearchIndex {
            index
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
              <Helmet defaultTitle={data.site.siteMetadata.title} titleTemplate={`%s | ${data.site.siteMetadata.title}`}>
                <meta name="description" content={data.site.siteMetadata.description}/>
                <meta name="author" content={data.site.siteMetadata.author}/>
                <link rel="canonical" href={`${data.site.siteMetadata.url}${location.pathname}`}/>
              </Helmet>
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
