import React from 'react'
import Img from 'gatsby-image'
import Styled from 'styled-components'
import RehypeReact from 'rehype-react'

import MetaText from '../components/MetaText'
import CopyButton from '../components/CopyButton'
import AdjacentPosts from '../components/Navigation/AdjacentPosts'
import { GutterContainer } from '../components/Container'
import { Colors } from '../utils/Theme'
import { FancyDate } from '../utils/Helpers'

const RenderAst = new RehypeReact({
  createElement: React.createElement,
  components: { 'copy-button': CopyButton },
}).Compiler

class BlogPost extends React.Component {
  render() {
    const { edges } = this.props.data.allMarkdownRemark
    const { markdownRemark } = this.props.data
    const { htmlAst, fields, frontmatter, } = markdownRemark
    const currDate = Date.parse(fields.date)
    let someDate
    let prevDate = -8640000000000000
    let nextDate = 8640000000000000
    let prevSlug = ''
    let nextSlug = ''
    const Blog = Styled.div`
      position: relative;
      display: flex;
      flex-direction: column;
    `
    const Banner = Styled.div`
      flex: 0 0 20rem;
      
      div {
        position: fixed;
        z-index: -1;
        width: 100%;
        height: 34rem;
        margin-top: -7rem;
      }
    `
    const ShadowWrapper = Styled.div`
      position: relative;
      flex: 1;
      box-shadow: 0rem 0rem 1.5rem -0.25rem black;
      background-color: ${Colors.background};
    `
    const PostHeader = Styled.div`
      margin-bottom: 3rem;

      h1 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 3.5rem;
        font-weight: normal;
      }
    `
    const PostBody = Styled.div`
      position: relative;

      h1, h2, h3, h4, h5, h6 {
        :hover {
          a.anchor svg {
            fill: ${Colors.text};
          }
        }
        a.anchor svg {
          transition: all 0.3s;
          fill: transparent;
        }
      }
      a.anchor svg {
        fill: ${Colors.text};
      }
      h1 > a.anchor {
        margin-left: -3rem;
        padding-right: 0.5rem;

        svg {
          height: 2.5rem;
          width: 2.5rem;
        }
      }
      h2 > a.anchor {
        margin-left: -2.375rem;
        padding-right: 0.5rem;

        svg {
          height: 1.875rem;
          width: 1.875rem;
        }
      }
      h3 > a.anchor {
        margin-left: -1.9375rem;
        padding-right: 0.5rem;

        svg {
          height: 1.4375rem;
          width: 1.4375rem;
        }
      }
      h4 > a.anchor {
        margin-left: -1.75rem;
        padding-right: 0.5rem;

        svg {
          height: 1.25rem;
          width: 1.25rem;
        }
      }
      h5 > a.anchor {
        margin-left: -1.5rem;
        padding-right: 0.5rem;

        svg {
          height: 1rem;
          width: 1rem;
        }
      }
      h6 > a.anchor {
        margin-left: -1.3125rem;
        padding-right: 0.5rem;

        svg {
          height: 0.8125rem;
          width: 0.8125rem;
        }
      }
    `
    const PostFooter = Styled.div`
      margin-top: 3rem;
    `
    edges.forEach(edge => {
      someDate = Date.parse(edge.node.fields.date)
      if(
        someDate < currDate && 
        someDate > prevDate
      ) {
        prevDate = someDate
        prevSlug = `/blog${edge.node.fields.slug}`
      }
      else if(
        someDate > currDate && 
        someDate < nextDate
      ) {
        nextDate = someDate
        nextSlug = `/blog${edge.node.fields.slug}`
      }
    })

    return (
      <Blog>
        <Banner>
          <div>
            <Img sizes={frontmatter.banner.childImageSharp.sizes} alt="Banner"/>
          </div>
        </Banner>
        <ShadowWrapper>
          <GutterContainer>
            <PostHeader>
              <h1>{frontmatter.title}</h1>
              <MetaText sections={[
                {
                  icon: ['far', 'calendar-alt'],
                  texts: [FancyDate(currDate)]
                },
                {
                  icon: ['far', 'clock'],
                  texts: [`${markdownRemark.timeToRead} min read`]
                }
              ]}/>
              <MetaText sections={[{
                icon: ['fas', 'tags'],
                texts: markdownRemark.frontmatter.tags,
                links: markdownRemark.fields.tagSlugs,
              }]}/>
              {frontmatter.project &&
                <MetaText sections={[{
                  icon: ['fas', 'asterisk'],
                  texts: ['Associated Project'],
                  links: [`${frontmatter.project}`]
                }]}/>
              }
            </PostHeader>
            <PostBody>{RenderAst(htmlAst)}</PostBody>
            <PostFooter>
              {frontmatter.reddit &&
                <MetaText sections={[{
                  icon: ['fab', 'reddit-alien'],
                  texts: ['Read and discuss this post on Reddit'],
                  links: [`${frontmatter.reddit}`],
                  type: 'external'
                }]}/>
              }
              {frontmatter.medium &&
                <MetaText sections={[{
                  icon: ['fab', 'medium-m'],
                  texts: ['Read and discuss this post on Medium'],
                  links: [`${frontmatter.medium}`],
                  type: 'external'
                }]}/>
              }
              <AdjacentPosts prev={prevSlug} next={nextSlug}/>
            </PostFooter>
          </GutterContainer>
        </ShadowWrapper>
      </Blog>
    )
  }
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    allMarkdownRemark(filter: {fields: {kind: {eq: "blog"}}}) {
      edges {
        node {
          fields {
            date
            slug
          }
        }
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      htmlAst
      timeToRead
      fields {
        date
        slug
        tagSlugs
      }
      frontmatter {
        banner {
          childImageSharp {
            sizes(maxWidth: 2400, maxHeight: 1200, cropFocus: CENTER) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        title
        tags
        project
        reddit
        medium
      }
    }
  }
`
