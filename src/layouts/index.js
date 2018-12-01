import React from 'react'
import Helmet from 'react-helmet'
import Styled, { ThemeProvider } from 'styled-components'
import Cookies from 'universal-cookie'

import '../css/prism-material.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { DarkTheme, LightTheme } from '../utils/Theme'
import { FontSans, LinkStyle } from '../utils/Text'

const cookies = new Cookies()

class IndexLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {theme: cookies.get('theme')}
    this.handleClickTheme = this.handleClickTheme.bind(this)
  }

  handleClickTheme() {
    const { theme } = this.state
    let newTheme
    if(theme == 'dark') {
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
    const metadata = this.props.data.site.siteMetadata
    const Base = Styled.div`
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
    const MainWrapper = Styled.main`
      flex: 1 1 auto;
      display: flex;
    `

    return(
      <ThemeProvider theme={theme == 'dark' ? DarkTheme : LightTheme}>
        <Base>
          <Helmet defaultTitle={metadata.title} titleTemplate={`%s | ${metadata.title}`}>
            <meta name="description" content={metadata.description}/>
            <meta name="author" content={metadata.author}/>
            <link rel="canonical" href={`${metadata.url}${this.props.location.pathname}`}/>
          </Helmet>
          <Header/>
          <MainWrapper>
            {this.props.children()}
          </MainWrapper>
          <Footer 
            links={this.props.data.allSocialJson.edges}
            theme={theme} 
            handleClickTheme={this.handleClickTheme}
          />
        </Base>
      </ThemeProvider>
    )
  }
}

export default IndexLayout

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        author
        description
        url
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
`
