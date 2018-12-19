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
    const { htmlAst, timeToRead, tableOfContents, fields, frontmatter, } = markdownRemark
    const { tagSlugs, targetTag } = fields
    const { created, updated, banner, title, topic, icon, tags, project, misc, toc, github, reddit, medium } = frontmatter

    const Article = Styled.div`
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      .title {
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
        font-size: 4rem;
        font-weight: normal;
      }
    `
    const PostBody = Styled.div`
      position: relative;
    `
    const TableOfContents = Styled.div`
      display: flex;
      flex-direction: column;
      margin-bottom: 3rem;
      > p {
        margin: 0;
        font-size: 2rem;
        font-weight: bold;
      }
      > div {
        > ul {
          padding-left: 2rem;
        }
        ul {
          margin: 0;
          list-style-type: upper-roman;
        }
      }
    `
    const PostFooter = Styled.div`
      margin-top: 3rem;
    `

    return (
      <BaseLayout location={this.props.location}>
        <Article>
          <Banner>
            <div>
              <Img fluid={banner.childImageSharp.fluid} alt="Banner"/>
            </div>
          </Banner>
          <ShadowWrapper>
            <PostContainer>
              <PostHeader>
                <h1 className='title'>{title}</h1>
                <MetaText
                  type='text'
                  icon={['fas', icon]}
                  texts={[topic]}
                  isInline={true}
                />
                <MetaText
                  type='text'
                  icon={['far', 'calendar-alt']}
                  texts={[FancyDateMDY(Date.parse(created))]}
                  isInline={true}
                />
                <MetaText
                  type='text'
                  icon={['far', 'clock']}
                  texts={[`${timeToRead} min read`]}
                  isInline={true}
                />
                <MetaText
                  type='internal'
                  icon={['fas', 'tags']}
                  texts={tags}
                  links={tagSlugs}
                />
                {project &&
                  <MetaText
                    type='internal'
                    icon={['fas', 'asterisk']}
                    texts={[`Related Project: ${project}`]}
                    links={[`/projects/${targetTag}`]}
                  />
                }
                {misc &&
                  <MetaText
                    type='internal'
                    icon={['fas', 'asterisk']}
                    texts={[`Related Misc: ${misc}`]}
                    links={[`/misc/${targetTag}`]}
                  />
                }
                {updated !== created &&
                  <MetaText
                    type='text'
                    icon={['fas', 'pencil-alt']}
                    texts={[`Last updated on ${FancyDateMDY(Date.parse(updated))}`]}
                  />
                }
              </PostHeader>
              {toc && 
                <TableOfContents>
                  <p>Table of Contents</p>
                  <div dangerouslySetInnerHTML={{__html: tableOfContents}}/>
                </TableOfContents>
              }
              <PostBody>{RenderAst(htmlAst)}</PostBody>
              <PostFooter>
                {github &&
                  <MetaText
                    type='external'
                    icon={['fab', 'github']}
                    texts={['Read and discuss this post on GitHub']}
                    links={[`${github}`]}
                  />
                }
                {reddit &&
                  <MetaText
                    type='external'
                    icon={['fab', 'reddit-alien']}
                    texts={['Read and discuss this post on Reddit']}
                    links={[`${reddit}`]}
                  />
                }
                {medium &&
                  <MetaText
                    type='external'
                    icon={['fab', 'medium-m']}
                    texts={['Read and discuss this post on Medium']}
                    links={[`${medium}`]}
                  />
                }
                <AdjacentPosts 
                  currentPost={markdownRemark}
                  allPosts={edges}
                />
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
      filter: {fields: {type: {eq: "article"} kind: {eq: "page"}} frontmatter: {draft: {ne: true}}}
      sort: {order: ASC, fields: [frontmatter___created]}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      htmlAst
      timeToRead
      tableOfContents(pathToSlugField: "fields.slug")
      fields {
        slug
        tagSlugs
        targetTag
        number
      }
      frontmatter {
        created
        updated
        banner {
          childImageSharp {
            fluid(maxWidth: 2400, maxHeight: 1200, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        topic
        icon
        tags
        project
        toc
        github
        reddit
        medium
      }
    }
  }
`
