import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import ReactMarkdown from 'react-markdown'
import Styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import RehypeReact from 'rehype-react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import MetaText from '../components/MetaText'
import { GutterContainer } from '../components/Container'
import { Colors, FontSans } from '../utils/Theme'
import Button from '../components/Button'
import AjaxGet from '../utils/Ajax'
import NavTabs from '../components/Navigation/NavTabs'
import BlogPostPreview from '../components/BlogPostPreview'

const RenderAst = new RehypeReact({
  createElement: React.createElement,
  components: {},
}).Compiler
const tabStrs = ['About', 'Posts', 'Misc', 'README']

class ProjectPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      watchCount: '',
      starCount: '',
      forkCount: '',
      license: '',
      homepage: '',
      readme: '',
      activeTab: tabStrs[0],
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const { github, external } = this.props.data.markdownRemark.frontmatter
    const reg = /\[([^#]+)]\(#.+?\)/g
    let homepage = ''
    if(github) {
      this.xhr = AjaxGet(`//api.github.com/repos/${github}`, (res) => {
        if(!res) {
          return
        }
        this.setState({
          watchCount: res['subscribers_count'],
          starCount: res['stargazers_count'],
          forkCount: res['forks_count'],
          license: res['license']['spdx_id'],
        })
        if(res['homepage'] != '' && !res['homepage'].includes('carsonkk')) {
          homepage = res['homepage']
        }
      })
      this.xhr = AjaxGet(`//api.github.com/repos/${github}/readme`, (res) => {
        if(!res) {
          return
        }
        this.setState({readme: atob(res['content']).replace(reg, '$1')})
      })
    }
    if(external) {
      this.setState({homepage: external})
    }
    else if(homepage) {
      this.setState({homepage})
    }
  }

  handleClick = (param) => (e) => {
    this.setState({
      activeTab: param
    })
  }

  componentWillUnmount() {
    if(this.xhr) {
      this.xhr.abort()
    }
  }

  render() {
    const { markdownRemark, allMarkdownRemark } = this.props.data
    const { htmlAst, frontmatter } = markdownRemark
    let tabs = []
    let contents = {}
    let tags
    const Banner = Styled.div`
      margin-bottom: 1.25rem;
    `
    const PostHeader = Styled.div`
      display: flex;
      flex-direction: column;
      margin-bottom: 2.75rem;
    `
    const HeaderContent = Styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    `
    const Left = Styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `
    const NameWrapper = Styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;

      .gatsby-image-outer-wrapper {
        margin-right: 1rem;

        img {
          border-radius: 50%;
        }
      }
      h1 {
        margin: 0 0 0.5rem 0;
        font-family: ${FontSans};
        font-size: 3em;
      }
    `
    const Description = Styled.span`
      font-style: italic;
    `
    const Right = Styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `
    const ButtonRow = Styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 0.25rem;

      > span:not(:first-child) {
        padding-left: 0.5rem;
      }
      > span:not(:last-child) {
        padding-right: 0.5rem;
      }
    `
    const PostBody = Styled.div`
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
      .readme {
        h1, h2 {
          padding-bottom: 0.3em;
          border-bottom: 1px solid ${Colors.fadedText};
        }
        blockquote {
          padding: 0 1em;
          color: ${Colors.fadedText};
          border-left: 0.25em solid ${Colors.fadedText};
        }
      }
    `
    tabs.push(
      <Button
        key={tabStrs[0]}
        type='action'
        text={tabStrs[0]}
        icon={['fas', 'info-circle']}
        func={this.handleClick(tabStrs[0])}
        radius='0rem 0rem 0.5rem 0.5rem'
        active={this.state.activeTab == tabStrs[0] ? 'active' : ''}
      />
    )
    contents[tabStrs[0]] = [RenderAst(htmlAst)]
    if(allMarkdownRemark) {
      tabs.push(
        <Button
          key={tabStrs[1]}
          type='action'
          text={tabStrs[1]}
          icon={['far', 'comment']}
          func={this.handleClick(tabStrs[1])}
          radius='0rem 0rem 0.5rem 0.5rem'
          active={this.state.activeTab == tabStrs[1] ? 'active' : ''}
        />
      )
      contents[tabStrs[1]] = [allMarkdownRemark.edges.map(
        edge => <BlogPostPreview key={edge.node.id} post={edge.node}/>
      )]
    }
    if(frontmatter.misc) {
      tabs.push(
        <Button
          key={tabStrs[2]}
          type='action'
          text={tabStrs[2]}
          icon={['fas', 'cogs']}
          func={this.handleClick(tabStrs[2])}
          radius='0rem 0rem 0.5rem 0.5rem'
          active={this.state.activeTab == tabStrs[2] ? 'active' : ''}
        />
      )
      contents[tabStrs[2]] = [RenderAst(frontmatter.misc.childMarkdownRemark.htmlAst)]
    }
    if(this.state.readme != '') {
      tabs.push(
        <Button
          key={tabStrs[3]}
          type='action'
          text={tabStrs[3]}
          icon={['fab', 'readme']}
          func={this.handleClick(tabStrs[3])}
          radius='0rem 0rem 0.5rem 0.5rem'
          active={this.state.activeTab == tabStrs[3] ? 'active' : ''}
        />
      )
      contents[tabStrs[3]] = [<ReactMarkdown key={'readme'} source={this.state.readme} className='readme'/>]
    }

    if(markdownRemark.fields.tagSlugs) {
      const tagsArray = markdownRemark.fields.tagSlugs
      tags = tagsArray.map((tag, i) => {
        const divider = i < tagsArray.length - 1 && <span>{`, `}</span>
        return (
          <span key={tag}>
            <Link to={tag}>{markdownRemark.frontmatter.tags[i]}</Link>
            {divider}
          </span>
        )
      })
    }

    return (
      <GutterContainer>
        <PostHeader>
          {frontmatter.banner &&
            <Banner>
              <Img sizes={frontmatter.banner.childImageSharp.sizes} alt="banner"/>
            </Banner>
          }
          <HeaderContent>
            <Left>
              <NameWrapper>
                {frontmatter.icon &&
                  <Img resolutions={frontmatter.icon.childImageSharp.resolutions} alt="icon"/>
                }
                <h1>{frontmatter.name}</h1>
              </NameWrapper>
              <div>
                <div>
                  <Description>{frontmatter.description}</Description>
                </div>
                <MetaText>
                  <span><FontAwesomeIcon icon="tags" fixedWidth/> {tags}</span>
                </MetaText>
              </div>
            </Left>
            <Right>
              <div>
                {frontmatter.github &&
                  <ButtonRow>
                    <Button
                      type='external'
                      href={`//github.com/${frontmatter.github}/watchers`}
                      icon={['fas', 'eye']}
                      text={`Watch ${this.state.watchCount}`}
                      size='sm'
                      border={true}
                    />
                    <Button
                      type='external'
                      href={`//github.com/${frontmatter.github}/stargazers`}
                      icon={['fas', 'star']}
                      text={`Star ${this.state.starCount}`}
                      size='sm'
                      border={true}
                    />
                    <Button
                      type='external'
                      href={`//github.com/${frontmatter.github}/network`}
                      icon={['fas', 'code-branch']}
                      text={`Fork ${this.state.forkCount}`}
                      size='sm'
                      border={true}
                    />
                  </ButtonRow>
                }
              </div>
              <div>
                {this.state.license && 
                  <MetaText>
                    <span>
                      <FontAwesomeIcon icon="balance-scale" fixedWidth/>
                      <span> {this.state.license} License</span>
                    </span>
                  </MetaText>
                }
                {frontmatter.github &&
                  <MetaText>
                    <span>
                      <FontAwesomeIcon icon={['fab', 'github']} fixedWidth/>
                      <OutboundLink href={`//github.com/${frontmatter.github}`} target="_blank"> github.com/{frontmatter.github}</OutboundLink>
                    </span>
                  </MetaText>
                }
                {this.state.homepage &&
                  <MetaText>
                    <span>
                      <FontAwesomeIcon icon="link" fixedWidth/>
                      <OutboundLink href={`//${this.state.homepage}`} target="_blank"> {this.state.homepage}</OutboundLink>
                    </span>
                  </MetaText>
                }
              </div>
            </Right>
          </HeaderContent>
          <NavTabs tabs={tabs}></NavTabs>
        </PostHeader>
        <PostBody>
          {contents[this.state.activeTab]}
        </PostBody>
      </GutterContainer>
    )
  }
}

export default ProjectPost

export const pageQuery = graphql`
  query ProjectPostBySlug($slug: String!) {
    allMarkdownRemark(
      filter: {fields: {kind: {eq: "blog"} tagSlugs: {regex: $slug}}}, 
      sort: {order: DESC, fields: [fields___date]}
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 140)
          fields {
            date
            slug
            tagSlugs
          }
          frontmatter {
            title
            tags
          }
        }
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      htmlAst
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        banner {
          childImageSharp {
            sizes(maxWidth: 800, maxHeight: 250, cropFocus: CENTER) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        icon {
          childImageSharp {
            resolutions(width: 100, height: 100, cropFocus: CENTER) {
              ...GatsbyImageSharpResolutions
            }
          }
        }
        name
        description
        tags
        github
        external
        misc {
          childMarkdownRemark {
            htmlAst
          }
        }
      }
    }
  }
`
