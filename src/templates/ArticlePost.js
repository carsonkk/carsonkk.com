import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Styled from 'styled-components'
import RehypeReact from 'rehype-react'

import BaseLayout from '../components/BaseLayout'
import MetaText from '../components/MetaText'
import CopyButton from '../components/CopyButton'
import AdjacentPosts from '../components/AdjacentPosts'
import { PostContainer } from '../utils/Container'
import { FancyDateMDY } from '../utils/Date'
import { FontSerif } from '../utils/Text'

const RenderAst = new RehypeReact({
  createElement: React.createElement,
  components: { 'copy-button': CopyButton },
}).Compiler

class ArticlePost extends React.Component {
  render() {
    const { edges } = this.props.data.allMarkdownRemark
    const { markdownRemark } = this.props.data
    const { htmlAst, fields, frontmatter, } = markdownRemark
    const currDate = Date.parse(fields.date)
    let someDate
    let prevDate = -8640000000000000
    let nextDate = 8640000000000000
    let prevSlug = '/articles'
    let nextSlug = '/articles'
    
    const Article = Styled.div`
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      h1 {
        font-family: ${FontSerif};
      }
    `
    const Banner = Styled.div`
      flex: 0 0 20rem;
      div {
        position: fixed;
        width: 100%;
        height: 34rem;
        margin-top: -7rem;
      }
    `
    const ShadowWrapper = Styled.div`
      position: relative;
      flex: 1;
      box-shadow: 0rem 0rem 1.5rem -0.25rem black;
      background-color: ${props => props.theme.primary};
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
            fill: ${props => props.theme.text};
          }
        }
        a.anchor svg {
          transition: all 0.3s;
          fill: transparent;
        }
      }
      a.anchor svg {
        fill: ${props => props.theme.text};
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
      if(someDate < currDate && someDate > prevDate) {
        prevDate = someDate
        prevSlug = edge.node.fields.slug
      }
      else if(someDate > currDate && someDate < nextDate) {
        nextDate = someDate
        nextSlug = edge.node.fields.slug
      }
    })

    return (
      <BaseLayout location={this.props.location}>
        <Article>
          <Banner>
            <div>
              <Img fluid={frontmatter.banner.childImageSharp.fluid} alt="Banner"/>
            </div>
          </Banner>
          <ShadowWrapper>
            <PostContainer>
              <PostHeader>
                <h1>{frontmatter.title}</h1>
                <MetaText
                  type='text'
                  icon={['fas', frontmatter.icon]}
                  texts={[frontmatter.category]}
                  isInline={true}
                />
                <MetaText
                  type='text'
                  icon={['far', 'calendar-alt']}
                  texts={[FancyDateMDY(currDate)]}
                  isInline={true}
                />
                <MetaText
                  type='text'
                  icon={['far', 'clock']}
                  texts={[`${markdownRemark.timeToRead} min read`]}
                  isInline={true}
                />
                <MetaText
                  type='internal'
                  icon={['fas', 'tags']}
                  texts={markdownRemark.frontmatter.tags}
                  links={markdownRemark.fields.tagSlugs}
                />
                {frontmatter.project &&
                  <MetaText
                    type='internal'
                    icon={['fas', 'asterisk']}
                    texts={[`Related Project: ${frontmatter.project}`]}
                    links={[`/projects/${fields.targetTag}`]}
                  />
                }
                {frontmatter.misc &&
                  <MetaText
                    type='internal'
                    icon={['fas', 'asterisk']}
                    texts={[`Related Misc: ${frontmatter.misc}`]}
                    links={[`/misc/${fields.targetTag}`]}
                  />
                }
              </PostHeader>
              <PostBody>{RenderAst(htmlAst)}</PostBody>
              <PostFooter>
                {frontmatter.reddit &&
                  <MetaText
                    type='external'
                    icon={['fab', 'reddit-alien']}
                    texts={['Read and discuss this post on Reddit']}
                    links={[`${frontmatter.reddit}`]}
                  />
                }
                {frontmatter.medium &&
                  <MetaText
                    type='external'
                    icon={['fab', 'medium-m']}
                    texts={['Read and discuss this post on Medium']}
                    links={[`${frontmatter.medium}`]}
                  />
                }
                <AdjacentPosts prev={prevSlug} next={nextSlug}/>
              </PostFooter>
            </PostContainer>
          </ShadowWrapper>
        </Article>
      </BaseLayout>
    )
  }
}

export default ArticlePost

export const pageQuery = graphql`
  query($slug: String!) {
    allMarkdownRemark(
      filter: {fields: {kind: {eq: "articles"}} frontmatter: {draft: {ne: true}}}
    ) {
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
        targetTag
      }
      frontmatter {
        banner {
          childImageSharp {
            fluid(maxWidth: 2400, maxHeight: 1200, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        category
        icon
        tags
        project
        reddit
        medium
      }
    }
  }
`
