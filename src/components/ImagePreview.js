import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import Styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { DarkTheme, RandomRange, RandomColor, RandomAngle, AngleToPercents } from '../utils/Theme'

class ImagePreview extends React.Component {
  constructor(props) {
    super(props)
    const ang = RandomAngle()
    this.state = {
      angle: ang,
      percents: AngleToPercents((ang+45)%360),
      lightColor: RandomColor(),
      darkColor: RandomColor(),
      duration: RandomRange(4, 10)
    }
  }

  render() {
    const { data, image } = this.props
    const { frontmatter, fields } = data
    const { slug } = fields
    const { title, icon, description } = frontmatter

    const ImagePreviewWrapper = Styled.div`
      transition: all 0.3s;
      flex: 1 0 ${100/3}%;
      position: relative;
      overflow: hidden;
      :hover {
        > div:first-child {
          filter: blur(0);
          transform: scale(1.1);
        }
        > div:nth-child(2) {
          opacity: 0.5;
        }
        > a > div:last-child > h2 {
          transition-delay: 0s;
          top: 2%;
          transform: translate(-50%, 2%);
        }
        > a > div:last-child > div:nth-child(2) {
          transition-delay: 0.1s;
          opacity: 1;
        }
        > a > div:last-child > div:last-child {
          transition: opacity 0.4s;
          opacity: 1;
        }
      }
      * {
        backface-visibility: hidden;
      }
    `
    const PostPreview = Styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      color: ${DarkTheme.text};
    `
    const PostTitle = Styled.h2`
      transition: all 0.3s;
      transition-delay: 0.1s;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% - 2rem);
      margin: 0;
      padding: 0 1rem;
      font-size: 2.5em;
      text-align: center;
    `
    const BackgroundFilter = Styled.div`
      transition: opacity 0.3s;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.7;
      background-color: black;
    `
    const Description = Styled.div`
      transition: opacity 0.3s;
      transition-delay: 0s;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 1rem;
      opacity: 0;
      text-align: center;
      span {
        font-style: italic;
      }
    `
    const Icon = Styled.div`
      transition: opacity 0.3s;
      position: absolute;
      top: 98%;
      left: 98%;
      transform: translate(-98%, -98%);
      opacity: 0;
      font-size: 2rem;
    `
    const breathing = keyframes`
      0% { 
        background-position:${this.state.percents[0]}% ${this.state.percents[1]}%;
      }
      50% { 
        background-position:${this.state.percents[2]}% ${this.state.percents[3]}%;
      }
      100% { 
        background-position:${this.state.percents[0]}% ${this.state.percents[1]}%;
      }
    `
    const BackgroundImage = frontmatter.bSingle ? Styled.div`
      transition: transform 0.4s, filter 0.6s;
      filter: blur(0.25rem);
    `
    : Styled.div`
      background: linear-gradient(${this.state.angle}deg, ${this.state.lightColor}, ${this.state.darkColor});
      background-size: 400% 400%;
      animation: ${breathing} ${this.state.duration}s ease infinite;
      img {
        display: none;
      }
    `

    return (
      <ImagePreviewWrapper>
        <BackgroundImage>
          <Img fluid={image} alt="Image Preview"/>
        </BackgroundImage>
        <BackgroundFilter/>
        <Link to={slug}>
          <PostPreview>
            <PostTitle>{title}</PostTitle>
            <Description>
              <span>{description}</span>
            </Description>
            <Icon>
              <FontAwesomeIcon icon={icon}/>
            </Icon>
          </PostPreview>
        </Link>
      </ImagePreviewWrapper>
    )
  }
}

ImagePreview.propTypes = {
  data: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired
}

export default ImagePreview
