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
import ImagePreviewSection from '../components/ImagePreviewSection'
import SmartLink from '../components/SmartLink'
import { DarkTheme } from '../utils/Theme'
import { PaddedContainer } from '../utils/Container'
import { MinWidth } from '../utils/Responsive'
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
      height: 67.5rem;
      overflow-x: hidden;
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
      display: block;
      margin-top: 0.375em;
      margin-bottom: 0.375em;
      font-size: 3.5em;
      font-weight: bold;
      text-align: center;
      line-height: 1;
    `
    const Divider = Styled(Box)`
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
      <BaseLayout>
        <SEO
          pathname={this.props.location.pathname}
        />
        <IndexWrapper>
          <IntroSection>
            <Slideshow images={images} rate={slideshowRate} subject='hiking'/>
            <BackgroundSlideshow images={images} rate={slideshowRate}/>
            <BackgroundFilter/>
            <IntroBlurb flexDirection="column" justifyContent="center" width={[1, 1, 1, 992]} mx="auto" px={[5, 5, 5, 0]}>
              <h1><GlitchedText prologue="Hey, my name's " fontSize={64} lineHeight={1.3} color={DarkTheme.text}>Kyle</GlitchedText></h1>
              <p>
                I'm a Software &amp; Computer Engineer from California with a passion for systems.
                This site is meant to consolidate the articles, tutorials, project writeups
                and everything else I've thrown together over the years.
              </p>
              <Flex justifyContent="center" flexWrap='wrap'>
                <Box width={[1, 1, 0.30, 0.25]} pr={[0, 0, 3]} mb={[2, 2, 0]}>
                  <DarkButton
                    type='internal'
                    to='/projects'
                    text='My Projects'
                    icon={['fas', 'code']}
                  />
                </Box>
                <Box width={[1, 1, 0.30, 0.25]} pl={[0, 0, 3]} mt={[2, 2, 0]}>
                  <DarkButton
                    type='internal'
                    to='/resume'
                    text='My Resume'
                    icon={['fas', 'paper-plane']}
                  />
                </Box>
              </Flex>
            </IntroBlurb>
          </IntroSection>
          <ShadowWrapper>
            <Flex justifyContent="center" flexWrap='wrap' px={[4, 5, 6, 6, 0]} py={5}>
              <Box width={[1, 1, 1, 1, "30%"]}>
                <ArticleColumnTitle>Featured Posts</ArticleColumnTitle>
                {featuredArticlePosts}
              </Box>
              <Divider width={[1, 1, 1, 1, "0.25rem"]} my={[4, 4, 4, 4, 0]} mx={[2, 2, 2, 2, 5]} pt={[1, 1, 1, 1, 0]}/>
              <Box width={[1, 1, 1, 1, "30%"]}>
                <ArticleColumnTitle>Recent Posts</ArticleColumnTitle>
                {recentArticlePosts}
              </Box>
            </Flex>
          </ShadowWrapper>
          <ImagePreviewSection posts={featuredProjectPostEdges} placeholders={data}/>
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
            title
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