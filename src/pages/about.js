import React from 'react'
import Img from 'gatsby-image'
import Styled from 'styled-components'

import { DarkTheme } from '../utils/Theme'


class AboutPage extends React.Component {
  render() {
    const { data } = this.props
    const { about } = data

    const AboutWrapper = Styled.div`
      position: relative;
      color: ${DarkTheme.text};
    `
    const Background = Styled.div`
      height: 100%;
    `
    const BackgroundFilter = Styled.div`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1));
    `
    const AboutSection = Styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 60%;
      right: 0;
      width: 40%;
      height: 100%;
      overflow: hidden;
      text-align: center;
    `

    return (
      <AboutWrapper>
        <Background>
          {about &&
            <Img sizes={about.sizes} alt="about"/>
          }
        </Background>
        <BackgroundFilter/>
        <AboutSection>
          <h1>About Me</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin bibendum felis lacus, bibendum imperdiet metus tempus non. Cras dictum nisi ut sem finibus sodales. Cras aliquet nisi vel ullamcorper maximus. Nam aliquam id massa eu ultrices. Proin tempor scelerisque massa, et consectetur massa facilisis vitae. Nunc lacus tellus, suscipit in orci et, gravida vestibulum enim. Etiam quis odio risus. Pellentesque vitae enim vitae nulla consequat laoreet. Maecenas quis tempor nunc, et fermentum orci. Fusce non est ligula. Nam non ante nibh. Phasellus faucibus nulla nec enim consectetur, non lobortis neque fermentum.</p>
        </AboutSection>
      </AboutWrapper>
    )
  }
}

export default AboutPage

export const pageQuery = graphql`
  query AboutPageQuery {
    about: imageSharp(id: { regex: "/about.jpg/" }) {
      sizes(maxWidth: 2100, maxHeight: 1125, cropFocus: CENTER) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`