import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { FontSans, RandomColor } from '../utils/Theme'

class ProjectPostPreview extends React.Component {
  render() {
    let Background
    let backgroundImage
    const ProjectPostPreviewWrapper = Styled.div`
      position: relative;
      flex: 0 0 ${100/3}%;

      :hover {
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
        > div:nth-child(2) {
          opacity: 0.5;
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

      div:first-child {
        flex: 2;
      }
      h2 {
        transition: transform 0.3s;
        transition-delay: 0.1s;
        transform: translateY(1.5rem);
        margin: 0;
        font-family: ${FontSans};
        font-size: 2.5em;
        text-align: center;
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
    if(this.props.post.frontmatter.banner) {
      Background = Styled.div``
      backgroundImage = this.props.post.frontmatter.banner.childImageSharp.sizes
    } else {
      Background = Styled.div`
        background-color: ${RandomColor()};

        img {
          display: none;
        }
      `
      backgroundImage = this.props.ph.sizes
    }
    const content = <PostPreview>
        <div></div>
        <h2>{this.props.post.frontmatter.name}</h2>
        <Description>
          <span>{this.props.post.frontmatter.description}</span>
        </Description>
        <Icon>
          <FontAwesomeIcon icon={this.props.post.frontmatter.icon}/>
        </Icon>
      </PostPreview>
    let foreground
    if(this.props.post.frontmatter.external) {
      foreground = <OutboundLink href={this.props.post.frontmatter.external} target="_blank">
          {content}
        </OutboundLink>
    } else {
      foreground = <Link to={`${this.props.post.fields.slug}`}>
          {content}
        </Link>
    }

    return (
      <ProjectPostPreviewWrapper>
        <Background>
          <Img sizes={backgroundImage} alt="banner"/>
        </Background>
        <BackgroundFilter></BackgroundFilter>
        {foreground}
      </ProjectPostPreviewWrapper>
    )
  }
}

export default ProjectPostPreview
