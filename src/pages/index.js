import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'

import BaseLayout from '../components/BaseLayout'
import SEO from '../components/SEO'
import Slideshow from '../components/Slideshow'
import BackgroundSlideshow from '../components/BackgroundSlideshow'
import GenericButton from '../components/GenericButton'
import TextPreview from '../components/TextPreview'
import ImagePreviewCollection from '../components/ImagePreviewCollection'
import SmartLink from '../components/SmartLink'
import { DarkTheme } from '../utils/Theme'
import { ResMinWidthEm, ResMinWidthPx, SpacingPx } from '../utils/Responsive'
import GlitchedText from '../components/GlitchedText'

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { hiking_1, hiking_2, hiking_3 } = data
    const featuredProjectPostEdges = data.featuredProjectPosts.edges
    const recentArticlePosts = data.recentArticlePosts.edges.map(edge => <TextPreview key={edge.node.id} data={edge.node}/>)
    const featuredArticlePosts = data.featuredArticlePosts.edges.map(edge => <TextPreview key={edge.node.id} data={edge.node}/>)
    const images = [hiking_1, hiking_2, hiking_3]
    const slideshowRate = 8000

    const IndexWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
    `
    const IntroSection = Styled.div`
      position: relative;
      height: 67.5em;
      overflow: hidden;
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
    const IntroBlurb = Styled(Flex)`
      position: absolute;
      top: 25%;
      left: 0;
      right: 0;
      z-index: 3;
      overflow: hidden;
      text-align: center;
    `
    const IntroTagline = Styled.span`
      font-size: 1.25em;
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
    const ArticleColumnTitle = Styled.span`
      text-align: center;
    `
    const Divider = Styled(Box)`
      background-color: ${props => props.theme.text};
    `
    const ShadowWrapper = Styled.div`
      position: relative;
      z-index: 50;
      box-shadow: 0 0 1em 0 black;
      background-color: ${props => props.theme.primary};
    `
    const ContactSection = Styled(Flex)`
      text-align: center;
    `
    const ContactTagline = Styled.span`
      font-size: 1.25em;
    `

    return (
      <BaseLayout>
        <SEO
          pathname={this.props.location.pathname}
        />
        <IndexWrapper>
          <IntroSection>
            <Slideshow images={images} rate={slideshowRate} subject='hiking'/>
            <BackgroundSlideshow images={images} rate={slideshowRate}/>
            <BackgroundFilter/>
            <IntroBlurb flexDirection="column" justifyContent="center" width={[1, 1, 1, ResMinWidthEm.s]} mx="auto" px={[4, 5, 6, 5, 0]}>
              <span className="hxxl"><GlitchedText prologue="Hey, my name's " fontSize={64} lineHeight={1.3} color={DarkTheme.text}>Kyle</GlitchedText></span>
              <IntroTagline>
                I'm a Software &amp; Computer Engineer from California with a passion for systems.
                This site is meant to consolidate the articles, project writeups,
                and everything else I've thrown together over the years.
              </IntroTagline>
              <Flex justifyContent="center" flexWrap="wrap" pt={4}>
                <Box width={[1, 1, 1, 0.25]} pr={[0, 0, 0, 3]} mb={[3, 3, 3, 0]}>
                  <DarkButton
                    type='internal'
                    to='/projects'
                    text='My Projects'
                    icon={['fas', 'code']}
                  />
                </Box>
                <Box width={[1, 1, 1, 0.25]} pl={[0, 0, 0, 3]} mt={[3, 3, 3, 0]}>
                  <DarkButton
                    type='internal'
                    to='/resume'
                    text='My Resume'
                    icon={['fas', 'code']}
                  />
                </Box>
              </Flex>
            </IntroBlurb>
          </IntroSection>
          <ShadowWrapper>
            <Flex justifyContent="center" flexWrap="wrap" width={[1, 1, 1, 1, ResMinWidthEm.m]} mx="auto" px={[4, 5, 6, 6, 0]} py={5}>
              <Box width={[1, 1, 1, ResMinWidthPx.m-SpacingPx[6], 0.44]}>
                <ArticleColumnTitle className="hxxl">Featured Posts</ArticleColumnTitle>
                {featuredArticlePosts}
              </Box>
              <Divider width={[1, 1, 1, ResMinWidthPx.m-SpacingPx[6], "0.25em"]} my={[4, 4, 4, 4, 0]} mx={[2, 2, 2, 2, 5]} pt={[1, 1, 1, 1, 0]}/>
              <Box width={[1, 1, 1, ResMinWidthPx.m-SpacingPx[6], 0.44]}>
                <ArticleColumnTitle className="hxxl">Recent Posts</ArticleColumnTitle>
                {recentArticlePosts}
              </Box>
            </Flex>
          </ShadowWrapper>
          <ImagePreviewCollection edges={featuredProjectPostEdges}/>
          <ShadowWrapper>
            <ContactSection flexDirection="column" alignItems="center" px={[4, 5, 6, 6, 0]} pt={5}>
              <span className="hxxl">Want to get in touch?</span>
              <ContactTagline>
                Shoot me an <SmartLink type='external' to='mailto:kyle@carsonkk.com' text='email' title='kyle@carsonkk.com'/>
                , or check out any of the other links below to find me elsewhere online
              </ContactTagline>
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
      filter: {fields: {type: {eq: "article"} kind: {eq: "page"}} frontmatter: {draft: {ne: true}}}
      sort: {order: DESC, fields: [frontmatter___created]}
    ) {
      edges {
        node {
          ...TextPreviewFragment
        }
      }
    }
    featuredArticlePosts: allMarkdownRemark(
      limit: 3
      filter: {fields: {type: {eq: "article"} kind: {eq: "page"}} frontmatter: {draft: {ne: true} feature: {eq: true}}}
      sort: {order: DESC, fields: [frontmatter___created]}
    ) {
      edges {
        node {
          ...TextPreviewFragment
        }
      }
    }
    featuredProjectPosts: allMarkdownRemark(
      limit: 6
      filter: {fields: {type: {eq: "project"} kind: {eq: "page"}} frontmatter: {draft: {ne: true} feature: {eq: true}}}
      sort: {order: ASC, fields: [fields___slug]}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            banner: banner {
              childImageSharp {
                fluid(maxWidth: 1800, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            icon
            title
            description
          }
        }
      }
    }
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