import React from 'react'
import Img from 'gatsby-image'
import Styled, { keyframes } from 'styled-components'

import { DarkTheme, VerticalInsetShadow } from '../utils/Theme'


class AboutPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    this.intervalHandle = setInterval(this.tick, 15000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandle)
  }

  tick() {
    this.setState(prevState => ({
      index: (prevState.index+1)%4
    }))
  }

  render() {
    const { data } = this.props
    const { me_one, me_two, me_three, me_four } = data
    const images = [me_one, me_two, me_three, me_four]

    const AboutWrapper = Styled.div`
      position: relative;
      width: 100%;
      color: ${DarkTheme.text};
    `
    const fadeOutTransition = keyframes`
      0% { 
        opacity: 1;
        transform: scale(1.02, 1.02);
        transform-origin: left;
      }
      90% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: scale(1.22, 1.22);
      }
    `
    const fadeInTransition = keyframes`
      0% {
        opacity: 0;
        transform: scale(1.0, 1.0);
      }
      90% {
        opacity: 0;
        transform: scale(1.0, 1.0);
      }
      100% {
        opacity: 1;
        transform: scale(1.02, 1.02);
        transform-origin: left;
      }
    `
    const Background = Styled.div`
      height: 100%;
      ${VerticalInsetShadow}
      > div:first-child {
        position: absolute;
        width: 100%;
        img {
          animation: ${fadeOutTransition} 15s linear infinite;
        }
      }
      > div:last-child img {
        animation: ${fadeInTransition} 15s linear infinite;
      }
    `
    const BackgroundFilter = Styled.div`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, 
        rgba(255,255,255,0) 0%,
        rgba(68,72,78,0.3) 40%,
        rgba(45,49,56,0.65) 45%,
        rgba(40,44,52,0.68) 46%,
        rgba(40,44,52,0.8) 50%,
        rgba(40,44,52,0.9) 55%,
        rgba(40,44,52,0.95) 60%,
        rgba(40,44,52,0.95) 100%
      );
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
      > div {
        padding: 1rem;
      }
    `


    return (
      <AboutWrapper>
        <Background>
          {images[this.state.index] &&
            <div>
              <Img sizes={images[this.state.index].sizes} alt="me"/>
            </div>
          }
          {images[(this.state.index+1)%images.length] &&
            <div>
              <Img sizes={images[(this.state.index+1)%images.length].sizes} alt="me"/>
            </div>
          }
        </Background>
        <BackgroundFilter/>
        <AboutSection>
          <div>
            <h1>About Me</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin bibendum felis lacus, bibendum imperdiet metus tempus non. Cras dictum nisi ut sem finibus sodales. Cras aliquet nisi vel ullamcorper maximus. Nam aliquam id massa eu ultrices. Proin tempor scelerisque massa, et consectetur massa facilisis vitae. Nunc lacus tellus, suscipit in orci et, gravida vestibulum enim. Etiam quis odio risus. Pellentesque vitae enim vitae nulla consequat laoreet. Maecenas quis tempor nunc, et fermentum orci. Fusce non est ligula. Nam non ante nibh. Phasellus faucibus nulla nec enim consectetur, non lobortis neque fermentum.</p>
          </div>
        </AboutSection>
      </AboutWrapper>
    )
  }
}

export default AboutPage

export const pageQuery = graphql`
  query AboutPageQuery {
    me_one: imageSharp(id: { regex: "/me-1.jpg/" }) {
      sizes(maxWidth: 2100, maxHeight: 1100, cropFocus: CENTER) {
        ...GatsbyImageSharpSizes
      }
    }
    me_two: imageSharp(id: { regex: "/me-2.jpg/" }) {
      sizes(maxWidth: 2100, maxHeight: 1100, cropFocus: NORTH) {
        ...GatsbyImageSharpSizes
      }
    }
    me_three: imageSharp(id: { regex: "/me-3.jpg/" }) {
      sizes(maxWidth: 2100, maxHeight: 1100, cropFocus: NORTH) {
        ...GatsbyImageSharpSizes
      }
    }
    me_four: imageSharp(id: { regex: "/me-4.jpg/" }) {
      sizes(maxWidth: 2100, maxHeight: 1100, cropFocus: NORTH) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`