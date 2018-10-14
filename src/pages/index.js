import React from 'react'
import Img from 'gatsby-image'
import Styled from 'styled-components'

import GenericButton from '../components/GenericButton'
import TextPreview from '../components/TextPreview'
import ImagePreviewSection from '../components/ImagePreviewSection'
import { DarkTheme } from '../utils/Theme'
import { PaddedContainer } from '../utils/Container';

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { hiking } = data
    const featuredProjectPostEdges = data.featuredProjectPosts.edges
    const recentBlogPosts = data.recentBlogPosts.edges.map(edge => <TextPreview key={edge.node.id} post={edge.node}/>)
    const featuredBlogPosts = data.featuredBlogPosts.edges.map(edge => <TextPreview key={edge.node.id} post={edge.node}/>)

    const IndexWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
    `
    const IntroSection = Styled.div`
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
      overflow: hidden;
      text-align: center;
      h1 {
        font-size: 4rem;
        span {
          color: ${props => props.theme.color};
        }
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
    const BlogSection = Styled(PaddedContainer)`
      display: flex;
      flex-direction: row;
      padding-top: 2rem;
      padding-bottom: 2rem;
    `
    const BlogColumn = Styled.div`
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
      z-index: 1;
      box-shadow: 0 0 1rem 0 black;
    `
    
    return (
      <IndexWrapper>
        <IntroSection>
          <Background>
            {hiking &&
              <Img sizes={hiking.sizes} alt="hiking"/>
            }
          </Background>
          <BackgroundFilter/>
          <IntroBlurb>
            <h1>Hey, my name's <span>Kyle</span></h1>
            <p>I'm a Software &amp; Computer Engineer from California with a passion for systems.
              This site is meant to consolidate the blog posts, tutorials, project writeups
              and everything else I've thrown together over the years.
            </p>
            <ButtonRow>
              <DarkButton
                type='internal'
                to='/about'
                text='About Me'
                icon={['fas', 'tree']}
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
          <BlogSection>
            <BlogColumn>
              <h1>Recent Posts</h1>
              {recentBlogPosts}
            </BlogColumn>
            <Divider/>
            <BlogColumn>
              <h1>Featured Posts</h1>
              {featuredBlogPosts}
            </BlogColumn>
          </BlogSection>
        </ShadowWrapper>
        <ImagePreviewSection posts={featuredProjectPostEdges} data={data}/>
        <ShadowWrapper>
          <ContactSection>
            <h1>Want to get in touch?</h1>
            <p>Shoot me an email or check out any of the other links below to find me elsewhere on the web</p>
          </ContactSection>
        </ShadowWrapper>
      </IndexWrapper>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageQuery {
    recentBlogPosts: allMarkdownRemark(
      limit: 3
      filter: {fields: {kind: {eq: "blog"} type: {eq: "page"}} frontmatter: {draft: {ne: true}}}
      sort: {order: DESC, fields: [fields___date]}
    ) {
      edges {
        node {
          ...TextPreviewFragment
        }
      }
    }
    featuredBlogPosts: allMarkdownRemark(
      limit: 3
      filter: {fields: {kind: {eq: "blog"} type: {eq: "page"}} frontmatter: {draft: {ne: true} feature: {eq: true}}}
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
    hiking: imageSharp(id: { regex: "/hiking.jpg/" }) {
      sizes(maxWidth: 1500, maxHeight: 750, cropFocus: NORTH) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`