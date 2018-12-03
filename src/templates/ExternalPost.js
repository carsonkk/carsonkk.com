import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'

import BaseLayout from '../components/BaseLayout'

class External extends React.Component {
  render() {
    const RedirectBackground = Styled.div`
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
      width: 100%;
      height: 100vh;
      background-color: white;
    `
    if(typeof window !== 'undefined') {
      window.location.replace(this.props.data.markdownRemark.frontmatter.website)
    }
    return(
      <BaseLayout location={this.props.location}>
        <RedirectBackground/>
      </BaseLayout>
    )
  }
}

export default External

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      frontmatter {
        website
      }
    }
  }
`
