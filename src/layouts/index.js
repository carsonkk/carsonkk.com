import React from 'react'
import Helmet from 'react-helmet'
import Styled from 'styled-components'

import '../css/global.css'
import '../css/prism-material.css'
import Header from '../components/Navigation/Header'
import Footer from '../components/Navigation/Footer'
import { Colors, FontSans, FontSerif } from '../utils/Theme'

class IndexLayout extends React.Component {
  render() {
    const metadata = this.props.data.site.siteMetadata
    const App = Styled.div`
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      font-family: ${FontSans};
      font-size: 1.25rem;
      line-height: 1.55;
      text-align: left;
      box-sizing: border-box;
      color: ${Colors.text};
      
      a {
        color: ${Colors.text};
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: ${FontSerif};
      }

      main {
        flex: 1;
      }
    `

    return(
      <App>
        <Helmet 
          defaultTitle={metadata.title} 
          titleTemplate={`%s | ${metadata.title}`} 
          bodyAttributes={{style: `margin: 0; background-color: ${Colors.background};`}}
        >
          <meta name="description" content={metadata.description}/>
          <meta name="author" content={metadata.author}/>
          <link rel="canonical" href={`${metadata.url}${this.props.location.pathname}`}/>
        </Helmet>
        <Header/>
        <main>
          {this.props.children()}
        </main>
        <Footer/>
      </App>
    )
  }
}

export default IndexLayout

export const pageQuery = graphql`
  query SiteMetadata {
    site {
      siteMetadata {
        title
        author
        description
        url
      }
    }
  }
`
