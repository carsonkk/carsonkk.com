import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import Styled, { keyframes } from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { DarkTheme, RandomRange, RandomColor, RandomAngle, AngleToPercents } from '../utils/Theme'


class ImagePreview extends React.Component {
  render() {
    const { post, image } = this.props
    const { frontmatter } = post
    const angle = RandomAngle()
    const percents = AngleToPercents((angle+45)%360)

    const ImagePreviewWrapper = Styled.div`
      transition: all 0.3s;
      flex: 1 0 ${100/3}%;
      position: relative;
      overflow: hidden;
      :hover {
        > div:first-child {
          transform: scale(1.1);
        }
        > div:nth-child(2) {
          opacity: 0.5;
        }
        > a > div:last-child > h2 {
          transition-delay: 0s;
          transform: translateY(-0.5rem);
        }
        > a > div:last-child > div:nth-child(3) {
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
      div:first-child {
        flex: 2;
      }
      h2 {
        transition: transform 0.3s;
        transition-delay: 0.1s;
        transform: translateY(1.5rem);
        margin: 0;
        font-size: 2.5em;
        text-align: center;
        padding: 0 1rem;
      }
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
      padding: 0 1rem;
      opacity: 0;
      text-align: center;
      flex-grow: 1;
      span {
        font-style: italic;
      }
    `
    const Icon = Styled.div`
      transition: opacity 0.3s;
      align-self: flex-end;
      margin: 0 1rem 0.5rem 0;
      opacity: 0;
      font-size: 2rem;
    `
    const breathing = keyframes`
      0% { background-position:${percents[0]}% ${percents[1]}% }
      50% { background-position:${percents[2]}% ${percents[3]}% }
      100% { background-position:${percents[0]}% ${percents[1]}% }
    `
    const BackgroundImage = frontmatter.bSingle ? Styled.div`
      transition: transform 0.4s;
    ` : Styled.div`
      background: linear-gradient(${angle}deg, ${RandomColor()}, ${RandomColor()});
      background-size: 400% 400%;
      animation: ${breathing} ${RandomRange(4, 10)}s ease infinite;
      img {
        display: none;
      }
    `

    return (
      <ImagePreviewWrapper>
        <BackgroundImage>
          <Img sizes={image} alt="Image Preview"/>
        </BackgroundImage>
        <BackgroundFilter/>
        <Link to={`${post.fields.slug}`}>
          <PostPreview>
            <div></div>
            <h2>{frontmatter.name}</h2>
            <Description>
              <span>{frontmatter.description}</span>
            </Description>
            <Icon>
              <FontAwesomeIcon icon={frontmatter.icon}/>
            </Icon>
          </PostPreview>
        </Link>
      </ImagePreviewWrapper>
    )
  }
}

ImagePreview.propTypes = {
  post: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired
}

export default ImagePreview
