import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Styled from 'styled-components'
import { Flex } from '@rebass/grid'
import RehypeReact from 'rehype-react'

import BaseLayout from '../components/BaseLayout'
import SEO from '../components/SEO'
import MetaText from '../components/MetaText'
import GenericButton from '../components/GenericButton'
import CopyButton from '../components/CopyButton'
import AdjacentPosts from '../components/AdjacentPosts'
import { FancyDateMDY } from '../utils/Date'
import { FontSerif } from '../utils/Text'
import { ResMinWidthEm } from '../utils/Responsive'

const RenderAst = new RehypeReact({
  createElement: React.createElement,
  components: { 'copy-button': CopyButton },
}).Compiler

class ArticlePost extends React.Component {
  render() {
    const { edges } = this.props.data.allMarkdownRemark
    const { markdownRemark } = this.props.data
    const { htmlAst, timeToRead, tableOfContents, excerpt, fields, frontmatter, } = markdownRemark
    const { targetTag } = fields
    const { created, updated, banner, title, topic, icon, tags, project, misc, toc, github, reddit, medium } = frontmatter
    const comments = (github || reddit || medium)
    const srcSetRegex = /,\n(.*) .*$/g
    let seoImg = null

    if(banner) {
      seoImg = srcSetRegex.exec(banner.childImageSharp.fluid.srcSet)
      seoImg = seoImg[1]
    } 
    
    const Article = Styled.div`
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 16em;
      .title {
        font-family: ${FontSerif};
      }
    `
    const Banner = Styled.div`
      flex: 0 0 24em;
      div {
        position: fixed;
        width: 100%;
        height: 100vh;
        top: 0;
      }
    `
    const ShadowWrapper = Styled.div`
      position: relative;
      flex: 1;
      box-shadow: 0em 0em 1.5em -0.25em black;
      background-color: ${props => props.theme.primary};
    `
    const PostHeader = Styled.div`
      margin-bottom: 2em;
      h1 {
        margin-top: 0;
        margin-bottom: 0.25em;
        font-size: 4em;
        font-weight: normal;
      }
    `
    const TableOfContents = Styled.div`
      display: flex;
      flex-direction: column;
      margin-bottom: 3em;
      > p {
        margin: 0;
        font-size: 2em;
        font-weight: bold;
      }
      > div {
        > ul {
          padding-left: 2em;
        }
        ul {
          margin: 0;
          list-style-type: upper-roman;
        }
      }
    `
    const PostBody = Styled.div`
      position: relative;
      > div {
        > p > img {
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
      }
    `
    const PostFooter = Styled.div`
      margin: 4em 0;
      h1 {
        margin-top: 0;
        margin-bottom: 0.25em;
      }
    `
    const PostFooterTagline = Styled.span`
      font-size: 1.5em;
      font-style: italic;
    `
    const PostButtonsWrapper = Styled.div`
      display: flex;
      justify-content: space-evenly;
      margin-top: 0.5em;
    `

    return (
      <BaseLayout>
        <SEO
          pathname={this.props.location.pathname}
          title={title}
          description={excerpt}
          image={seoImg}
          article={true}
        />
        <Article>
          <Banner>
            <div>
              <Img fluid={banner.childImageSharp.fluid} alt="Banner"/>
            </div>
          </Banner>
          <ShadowWrapper>
            <Flex flexDirection="column" width={[1, 1, 1, 1, ResMinWidthEm.s]} mx="auto" px={[4, 5, 6, 6, 0]} pt={5}>
              <PostHeader>
                <h1 className='title'>{title}</h1>
                <MetaText
                  type='text'
                  icon={['fas', icon]}
                  texts={[`${topic} Article`]}
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
                  links={Array(tags.length).fill('/search')}
                  linkStates={tags.map(tag => ({tag: tag}))}
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
              <hr/>
              <AdjacentPosts 
                currentPost={markdownRemark}
                allPosts={edges}
              />
              <PostFooter>
                {comments &&
                  <div>
                    <h1>Discussion</h1>
                    <PostFooterTagline>Questions? Comments? Join the discussion over on the...</PostFooterTagline>
                    <PostButtonsWrapper>
                      {github &&
                        <GenericButton
                          type='external'
                          to={github}
                          text='Issue'
                          icon={['fab', 'github']}
                        />
                      }
                      {reddit &&
                        <GenericButton
                          type='external'
                          to={reddit}
                          text='Post'
                          icon={['fab', 'reddit-alien']}
                        />
                      }
                      {medium &&
                        <GenericButton
                          type='external'
                          to={medium}
                          text='Article'
                          icon={['fab', 'medium-m']}
                        />
                      }
                    </PostButtonsWrapper>
                  </div>
                }
              </PostFooter>
            </Flex>
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
      excerpt(pruneLength: 140)
      fields {
        slug
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
