import React from 'react'
import Img from 'gatsby-image'
import Styled from 'styled-components'

import { FontBase, DarkTheme } from '../utils/Theme'
import Button from '../components/Button'
import BlogPostPreview from '../components/BlogPostPreview'
import PostImagePreviewSection from '../components/PostImagePreviewSection'

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { neature } = data
    const recentBlogPostEdges = data.recentBlogPosts.edges
    const featuredBlogPostEdges = data.featuredBlogPosts.edges
    const featuredProjectPostEdges = data.featuredProjectPosts.edges
    const IndexWrapper = Styled.div`
      display: flex;
      flex-direction: column;
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
    const IntroBlurb = Styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      top: 0;
      bottom: 20%;
      left: 0;
      right: 0;
      width: 60%;
      overflow: hidden;
      margin: auto;
      padding: 2rem;
      text-align: center;
      h1 {
        font-family: ${FontBase};
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
    const DarkButton = Styled(Button)`
      a {
        color: ${DarkTheme.text};
        :hover {
          color: ${DarkTheme.primary};
          background-color: ${DarkTheme.text};
          span > svg {
            color: ${DarkTheme.primary};
          }
        }
        span > svg {
          color: ${DarkTheme.text};
        }
      }
    `
    const BlogSection = Styled.div`
      display: flex;
      flex-direction: row;
      padding-top: 2rem;
      padding-bottom: 2rem;
      z-index: 1;
      box-shadow: 0rem 0rem 1.5rem -0.25rem black;
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
    const ContactSection = Styled.div`
      padding-top: 2rem;
      z-index: 1;
      text-align: center;
      box-shadow: 0rem 0rem 1.5rem -0.25rem black;
    `
    const recentBlogPosts = recentBlogPostEdges.map(edge => <BlogPostPreview key={edge.node.id} post={edge.node}/>)
    const featuredBlogPosts = featuredBlogPostEdges.map(edge => <BlogPostPreview key={edge.node.id} post={edge.node}/>)
    return (
      <IndexWrapper>
        <IntroSection>
          <Background>
            {neature &&
              <Img sizes={neature.sizes} alt="neature"/>
            }
          </Background>
          <BackgroundFilter/>
          <IntroBlurb>
            <h1>Hey, my name's Kyle</h1>
            <p>I'm a Software &amp; Computer Engineer from California with a passion for systems.
              This site is meant to consolidate the blog posts, tutorials, project writeups
              and everything else I've thrown together over the years.
            </p>
            <ButtonRow>
              <DarkButton
                type='internal'
                href='/about'
                icon={['fas', 'tree']}
                text='About Me'
              />
              <DarkButton
                type='internal'
                href='/resume'
                icon={['fas', 'paper-plane']}
                text='My Resume'
              />
            </ButtonRow>
          </IntroBlurb>
        </IntroSection>
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
        <PostImagePreviewSection posts={featuredProjectPostEdges} data={data}/>
        <ContactSection>
          <h1>Want to get in touch?</h1>
          <p>Shoot me an email or check out any of the other links below to find me elsewhere on the web</p>
        </ContactSection>
      </IndexWrapper>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageQuery {
    recentBlogPosts: allMarkdownRemark(
      limit: 3
      filter: {fields: {kind: {eq: "blog"}}}
      sort: {order: DESC, fields: [fields___date]}
    ) {
      edges {
        node {
          id
          timeToRead
          excerpt(pruneLength: 140)
          fields {
            date
            slug
          }
          frontmatter {
            title
            icon
            tags
          }
        }
      }
    }
    featuredBlogPosts: allMarkdownRemark(
      limit: 3
      filter: {fields: {kind: {eq: "blog"}} frontmatter: {featured: {eq: true}}}
      sort: {order: DESC, fields: [fields___date]}
    ) {
      edges {
        node {
          id
          timeToRead
          excerpt(pruneLength: 140)
          fields {
            date
            slug
          }
          frontmatter {
            title
            icon
            tags
          }
        }
      }
    }
    featuredProjectPosts: allMarkdownRemark(
      limit: 3
      filter: {fields: {kind: {eq: "project"} type: {eq: "page"}}  frontmatter: {featured: {eq: true}}}
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
    neature: imageSharp(id: { regex: "/neature.jpg/" }) {
      sizes(maxWidth: 1500, maxHeight: 750, cropFocus: CENTER) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`