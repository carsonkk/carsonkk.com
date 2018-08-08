import React from 'react'
import Helmet from 'react-helmet'
import Styled, { ThemeProvider } from 'styled-components'

import '../css/prism-material.css'
import Header from '../components/Navigation/Header'
import Footer from '../components/Navigation/Footer'
import { DarkTheme, LightTheme, FontSans } from '../utils/Theme'

class IndexLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isDarkTheme: true}
    this.handleClickTheme = this.handleClickTheme.bind(this)
  }

  handleClickTheme() {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme
    }))
  }

  render() {
    const metadata = this.props.data.site.siteMetadata
    const Base = Styled.div`
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      height: 100%;
      font-family: ${FontSans};
      font-size: 1.25rem;
      line-height: 1.55;
      text-align: left;
      box-sizing: border-box;
      color: ${props => props.theme.text};
      background-color: ${props => props.theme.primary};
      a {
        color: ${props => props.theme.text};
        text-decoration: none;
      }
      p > a,
      li > a {
        text-decoration: underline;
      }
      h1, h2, h3, h4, h5, h6 {
        font-family: ${FontSans};
        line-height: 1;
      }
      blockquote {
        margin: 0;
      }
    `
    const MainWrapper = Styled.main`
      flex: 1 1 auto;
    `

    return(
      <ThemeProvider theme={this.state.isDarkTheme ? DarkTheme : LightTheme}>
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
            isDarkTheme={this.state.isDarkTheme} 
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
          name
          url
          text
          color
          icon
        }
      }
    }
  }
`