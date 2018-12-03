import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'

import BaseLayout from '../components/BaseLayout'
import Slideshow from '../components/Slideshow'
import BackgroundSlideshow from '../components/BackgroundSlideshow'
import GenericButton from '../components/GenericButton'
import TextPreview from '../components/TextPreview'
import ImagePreviewSection from '../components/ImagePreviewSection'
import SmartLink from '../components/SmartLink'
import { DarkTheme } from '../utils/Theme'
import { PaddedContainer } from '../utils/Container'
import GlitchedText from '../components/GlitchedText'

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

    return (
      <BaseLayout location={this.props.location}>
        <IndexWrapper>
          <IntroSection>
            <Slideshow images={images} rate={rate} subject='hiking'/>
            <BackgroundSlideshow images={images} rate={rate}/>
            <BackgroundFilter/>
            <IntroBlurb>
              <h1><GlitchedText prologue="Hey, my name's " fontSize={64} lineHeight={1.3} color={DarkTheme.text}>Kyle</GlitchedText></h1>
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
      </BaseLayout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  {
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
                fluid(maxWidth: 600, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            bDouble: banner {
              childImageSharp {
                fluid(maxWidth: 900, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            bTriple: banner {
              childImageSharp {
                fluid(maxWidth: 1800, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
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
    hiking_1: imageSharp(fluid: {originalName: {regex: "/hiking-1.jpg/"}}) {
      fluid(maxWidth: 1920, maxHeight: 1080, cropFocus: NORTH) {
        ...GatsbyImageSharpFluid
      }
    }
    hiking_2: imageSharp(fluid: {originalName: {regex: "/hiking-2.jpg/"}}) {
      fluid(maxWidth: 1920, maxHeight: 1080) {
        ...GatsbyImageSharpFluid
      }
    }
    hiking_3: imageSharp(fluid: {originalName: {regex: "/hiking-3.jpg/"}}) {
      fluid(maxWidth: 1920, maxHeight: 1080, cropFocus: SOUTH) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`