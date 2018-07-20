import React from 'react'
import Img from 'gatsby-image'
import ReactMarkdown from 'react-markdown'
import Styled from 'styled-components'
import RehypeReact from 'rehype-react'

import MetaText from '../components/MetaText'
import { GutterContainer } from '../components/Container'
import { FontSans } from '../utils/Theme'
import Button from '../components/Button'
import AjaxGet from '../utils/Ajax'
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
      website: '',
      readme: '',
      activeTab: tabStrs[0],
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const { github, website } = this.props.data.markdownRemark.frontmatter
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
    if(website) {
      this.setState({website})
    }
    else if(homepage) {
      this.setState({website: homepage})
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
    const Banner = Styled.div`
      margin-bottom: 1rem;
    `
    const PostHeader = Styled.div`
      display: flex;
      flex-direction: column;
      margin-bottom: 3rem;
    `
    const HeaderContent = Styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 1rem;
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
    const GitHubButton = Styled(Button)`
      && {
        a {
          padding: 0.375rem 0.5rem;
          border: 2px solid ${props => props.theme.text};
          font-size: 1rem;
          span > svg {
            font-size: 0.675rem;
          }
        }
      }
    `
    const NavTabs = Styled.div`
      display: flex;
      border-top: 0.125rem solid ${props => props.theme.text};
    `
    const NavButton = Styled(Button)`
      && {
        button {
          border-radius: 0 0 0.5rem 0.5rem;
        }
      }
    `
    const PostBody = Styled.div`
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
          border-bottom: 1px solid ${props => props.theme.caption};
        }
        blockquote {
          padding: 0 1em;
          color: ${props => props.theme.caption};
          border-left: 0.25em solid ${props => props.theme.caption};
        }
      }
    `
    tabs.push(
      <NavButton
        key={tabStrs[0]}
        type='action'
        text={tabStrs[0]}
        icon={['fas', 'info-circle']}
        func={this.handleClick(tabStrs[0])}
        active={this.state.activeTab == tabStrs[0] ? 'active' : ''}
      />
    )
    contents[tabStrs[0]] = [RenderAst(htmlAst)]
    if(allMarkdownRemark) {
      tabs.push(
        <NavButton
          key={tabStrs[1]}
          type='action'
          text={tabStrs[1]}
          icon={['far', 'comment']}
          func={this.handleClick(tabStrs[1])}
          active={this.state.activeTab == tabStrs[1] ? 'active' : ''}
        />
      )
      contents[tabStrs[1]] = [allMarkdownRemark.edges.map(
        edge => <BlogPostPreview key={edge.node.id} post={edge.node}/>
      )]
    }
    if(frontmatter.misc) {
      tabs.push(
        <NavButton
          key={tabStrs[2]}
          type='action'
          text={tabStrs[2]}
          icon={['fas', 'cogs']}
          func={this.handleClick(tabStrs[2])}
          active={this.state.activeTab == tabStrs[2] ? 'active' : ''}
        />
      )
      contents[tabStrs[2]] = [RenderAst(frontmatter.misc.childMarkdownRemark.htmlAst)]
    }
    if(this.state.readme != '') {
      tabs.push(
        <NavButton
          key={tabStrs[3]}
          type='action'
          text={tabStrs[3]}
          icon={['fab', 'readme']}
          func={this.handleClick(tabStrs[3])}
          active={this.state.activeTab == tabStrs[3] ? 'active' : ''}
        />
      )
      contents[tabStrs[3]] = [<ReactMarkdown key={'readme'} source={this.state.readme} className='readme'/>]
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
                {frontmatter.logo &&
                  <Img resolutions={frontmatter.logo.childImageSharp.resolutions} alt="logo"/>
                }
                <h1>{frontmatter.name}</h1>
              </NameWrapper>
              <div>
                <div>
                  <Description>{frontmatter.description}</Description>
                </div>
                <MetaText sections={[{
                  icon: ['fas', 'tags'],
                  texts: markdownRemark.frontmatter.tags,
                  links: markdownRemark.fields.tagSlugs,
                }]}/>
              </div>
            </Left>
            <Right>
              <div>
                {frontmatter.github &&
                  <ButtonRow>
                    <GitHubButton
                      type='external'
                      href={`//github.com/${frontmatter.github}/watchers`}
                      icon={['fas', 'eye']}
                      text={`Watch ${this.state.watchCount}`}
                    />
                    <GitHubButton
                      type='external'
                      href={`//github.com/${frontmatter.github}/stargazers`}
                      icon={['fas', 'star']}
                      text={`Star ${this.state.starCount}`}
                    />
                    <GitHubButton
                      type='external'
                      href={`//github.com/${frontmatter.github}/network`}
                      icon={['fas', 'code-branch']}
                      text={`Fork ${this.state.forkCount}`}
                    />
                  </ButtonRow>
                }
              </div>
              <div>
                {this.state.license && 
                  <MetaText sections={[{
                    icon: ['fas', 'balance-scale'],
                    texts: [`${this.state.license} License`]
                  }]}/>
                }
                {frontmatter.github &&
                  <MetaText sections={[{
                    icon: ['fab', 'github'],
                    texts: [`github.com/${frontmatter.github}`],
                    links: [`//github.com/${frontmatter.github}`],
                    type: 'external'
                  }]}/>
                }
                {this.state.website &&
                  <MetaText sections={[{
                    icon: ['fas', 'link'],
                    texts: [this.state.website],
                    links: [`//${this.state.website}`],
                    type: 'external'
                  }]}/>
                }
              </div>
            </Right>
          </HeaderContent>
          <NavTabs>
            {tabs}
          </NavTabs>
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
  query ProjectPostBySlug($slug: String!, $targetTag: String!) {
    allMarkdownRemark(
      filter: {fields: {kind: {eq: "blog"}, targetTag: {regex: $targetTag}}}, 
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
        logo {
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
        website
        misc {
          childMarkdownRemark {
            htmlAst
          }
        }
      }
    }
  }
`
