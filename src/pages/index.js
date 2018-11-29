import React from 'react'
import Styled, { keyframes } from 'styled-components'

import Slideshow from '../components/Slideshow'
import BackgroundSlideshow from '../components/BackgroundSlideshow'
import GenericButton from '../components/GenericButton'
import TextPreview from '../components/TextPreview'
import ImagePreviewSection from '../components/ImagePreviewSection'
import SmartLink from '../components/SmartLink'
import { DarkTheme, RandomRange } from '../utils/Theme'
import { PaddedContainer } from '../utils/Container'


class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { hiking_1, hiking_2, hiking_3 } = data
    const featuredProjectPostEdges = data.featuredProjectPosts.edges
    const recentArticlePosts = data.recentArticlePosts.edges.map(edge => <TextPreview key={edge.node.id} post={edge.node}/>)
    const featuredArticlePosts = data.featuredArticlePosts.edges.map(edge => <TextPreview key={edge.node.id} post={edge.node}/>)
    const images = [hiking_1, hiking_2, hiking_3]
    const rate = 8000

    const IndexWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
    `
    const IntroSection = Styled.div`
      position: relative;
      color: ${DarkTheme.text};
    `
    const BackgroundFilter = Styled.div`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
      opacity: 0.7;
      background-color: black;
    `
    const IntroBlurb = Styled(PaddedContainer)`
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      top: 0;
      bottom: 20%;
      left: 0;
      right: 0;
      z-index: 3;
      overflow: hidden;
      text-align: center;
      h1 {
        font-size: 4rem;
      }
    `
    const ButtonRow = Styled.div`
      display: flex;
      justify-content: center;
      > span:first-child {
        margin-right: 1.5rem;
      }
      > span:last-child {
        margin-left: 1.5rem;
      }
    `
    const DarkButton = Styled(GenericButton)`
      && {
        a {
          color: ${DarkTheme.text};
          :hover {
            background-color: ${DarkTheme.text};
            svg {
              color: ${props => props.theme.color};
            }
            span > span {
              color: ${DarkTheme.primary};
            }
          }
          svg {
            color: ${DarkTheme.text};
          }
        }
      }
    `
    const ArticleSection = Styled(PaddedContainer)`
      display: flex;
      flex-direction: row;
      padding-top: 2rem;
      padding-bottom: 2rem;
    `
    const ArticleColumn = Styled.div`
      padding-left: 2rem;
      padding-right: 2rem;
    `
    const Divider = Styled.div`
      flex: 1 0 auto;
      width: 0.25rem;
      margin: 2rem;
      background-color: ${props => props.theme.text};
    `
    const ContactSection = Styled(PaddedContainer)`
      padding-top: 2rem;
      text-align: center;
    `
    const ShadowWrapper = Styled.div`
      position: relative;
      z-index: 50;
      box-shadow: 0 0 1rem 0 black;
      background-color: ${props => props.theme.primary};
    `
    const tearing = keyframes`
      0% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      5% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      10% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      15% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      20% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      25% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      30% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      35% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      40% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      45% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      50% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      55% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      60% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      65% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      70% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      80% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      85% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      90% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      95% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
      100% {
        clip: rect(${RandomRange(1, 100)}px, 1000px, ${RandomRange(1, 100)}px, 0);
      }
    `
    const GlitchedTextTear = Styled.span`
      display: block;
      position: absolute;
      z-index: 5;
      margin: 0 auto;
      font-size: 100px;
      &::before, &::after{
        content: attr(data-text);
        position: absolute;
        top: 0;
        overflow: hidden;
        clip: rect(0, 1000px, 0, 0);
      }
      &::before{
        left: -2px;
        text-shadow: 2px 0 #f0f;
        animation: ${tearing} 3s infinite linear alternate-reverse;
      }
      &::after{
        left: 2px;
        text-shadow: -2px 0 #0f0;
        animation: ${tearing} 2s infinite linear alternate-reverse;
      }
    `
    const seperating = keyframes`
      0% {
        transform: translate(0);
      }
      3% {
        transform: translate(-${RandomRange(3, 7)}px, ${RandomRange(3, 7)}px);
      }
      6% {
        transform: translate(-${RandomRange(3, 7)}px, -${RandomRange(3, 7)}px);
      }
      9% {
        transform: translate(${RandomRange(3, 7)}px, ${RandomRange(3, 7)}px);
      }
      12% {
        transform: translate(${RandomRange(3, 7)}px, -${RandomRange(3, 7)}px);
      }
      15% {
        transform: translate(0);
      }
      100% {
        transform: translate(0);
      }
    `
    const GlitchedTextSeparate = Styled.span`
      display: block;
      position: absolute;
      z-index: 4;
      margin: 0 auto;
      font-size: 100px;
      &::before, &::after{
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        z-index: -2;
      }
      &::before{
        color: #0ff;
      }
      &::after{
        color: #ff0;
      }
      &:hover {
        &::before{
          animation: ${seperating} 2.75s cubic-bezier(.25, .45, .45, .95) both infinite
        }
        &::after{
          animation: ${seperating} 2.75s cubic-bezier(.25, .45, .45, .95) reverse both infinite
        }
      }
    `
    // content: attr(data-text);
    //   position: absolute;
    //   left: 2px;
    //   text-shadow: -1px 0 red;
    //   top: 0;
    //   color: white;
    //   background: black;
    //   overflow: hidden;
    //   clip: rect(0,900px,0,0); 
    //   animation: ${noise_anim} 2s infinite linear alternate-reverse;
    // content: attr(data-text);
    //   position: absolute;
    //   left: -2px;
    //   text-shadow: 1px 0 blue; 
    //   top: 0;
    //   color: white;
    //   background: black;
    //   overflow: hidden;
    //   clip: rect(0,900px,0,0); 
    //   animation: ${noise_anim_t} 3s infinite linear alternate-reverse;
    return (
      <IndexWrapper>
        <IntroSection>
          <Slideshow images={images} rate={rate} subject='hiking'/>
          <BackgroundSlideshow images={images} rate={rate}/>
          <BackgroundFilter/>
          <IntroBlurb>
            <GlitchedTextTear data-text="Kyle">Kyle</GlitchedTextTear>
            <GlitchedTextSeparate data-text="Kyle">Kyle</GlitchedTextSeparate>
            <p>
              I'm a Software &amp; Computer Engineer from California with a passion for systems.
              This site is meant to consolidate the articles, tutorials, project writeups
              and everything else I've thrown together over the years.
            </p>
            <ButtonRow>
              <DarkButton
                type='internal'
                to='/projects'
                text='My Projects'
                icon={['fas', 'code']}
              />
              <DarkButton
                type='internal'
                to='/resume'
                text='My Resume'
                icon={['fas', 'paper-plane']}
              />
            </ButtonRow>
          </IntroBlurb>
        </IntroSection>
        <ShadowWrapper>
          <ArticleSection>
            <ArticleColumn>
              <h1>Recent Posts</h1>
              {recentArticlePosts}
            </ArticleColumn>
            <Divider/>
            <ArticleColumn>
              <h1>Featured Posts</h1>
              {featuredArticlePosts}
            </ArticleColumn>
          </ArticleSection>
        </ShadowWrapper>
        <ImagePreviewSection posts={featuredProjectPostEdges} data={data}/>
        <ShadowWrapper>
          <ContactSection>
            <h1>Want to get in touch?</h1>
            <p>
              Shoot me an <SmartLink type='external' to='mailto:kyle@carsonkk.com' text='email' title='kyle@carsonkk.com'/>
              , or check out any of the other links below to find me elsewhere online
            </p>
          </ContactSection>
        </ShadowWrapper>
      </IndexWrapper>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageQuery {
    recentArticlePosts: allMarkdownRemark(
      limit: 3
      filter: {fields: {kind: {eq: "articles"} type: {eq: "page"}} frontmatter: {draft: {ne: true}}}
      sort: {order: DESC, fields: [fields___date]}
    ) {
      edges {
        node {
          ...TextPreviewFragment
        }
      }
    }
    featuredArticlePosts: allMarkdownRemark(
      limit: 3
      filter: {fields: {kind: {eq: "articles"} type: {eq: "page"}} frontmatter: {draft: {ne: true} feature: {eq: true}}}
      sort: {order: DESC, fields: [fields___date]}
    ) {
      edges {
        node {
          ...TextPreviewFragment
        }
      }
    }
    featuredProjectPosts: allMarkdownRemark(
      limit: 6
      filter: {fields: {kind: {eq: "project"} type: {eq: "page"}} frontmatter: {draft: {ne: true} feature: {eq: true}}}
      sort: {order: ASC, fields: [fields___slug]}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            bSingle: banner {
              childImageSharp {
                sizes(maxWidth: 600, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            bDouble: banner {
              childImageSharp {
                sizes(maxWidth: 900, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            bTriple: banner {
              childImageSharp {
                sizes(maxWidth: 1800, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            icon
            name
            description
          }
        }
      }
    }
    ...PlaceholderImageFragment
    hiking_1: imageSharp(id: { regex: "/hiking-1.jpg/" }) {
      sizes(maxWidth: 1920, maxHeight: 1080, cropFocus: NORTH) {
        ...GatsbyImageSharpSizes
      }
    }
    hiking_2: imageSharp(id: { regex: "/hiking-2.jpg/" }) {
      sizes(maxWidth: 1920, maxHeight: 1080) {
        ...GatsbyImageSharpSizes
      }
    }
    hiking_3: imageSharp(id: { regex: "/hiking-3.jpg/" }) {
      sizes(maxWidth: 1920, maxHeight: 1080, cropFocus: SOUTH) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`