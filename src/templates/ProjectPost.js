import React from 'react'
import Img from 'gatsby-image'
import ReactMarkdown from 'react-markdown'
import Styled from 'styled-components'
import RehypeReact from 'rehype-react'

import GenericButton from '../components/GenericButton'
import MetaText from '../components/MetaText'
import TextPreview from '../components/TextPreview'
import { PostContainer } from '../utils/Container'
import { FontSans } from '../utils/Theme'
import AjaxGet from '../utils/Ajax'

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
          forkCount: res['forks_count']
        })
        if(res['license'] != null) {
          this.setState({license: res['license']['spdx_id']})
        }
        if(res['homepage'] != null) {
          if(res['homepage'] != '' && !res['homepage'].includes('carsonkk')) {
            homepage = res['homepage']
          }
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
    const crop = frontmatter.allowCropping == undefined ? true : frontmatter.allowCropping
    let tabs = []
    let contents = {}

    const ProjectPostWrapper = PostContainer.extend`
      width: 100%;
    `
    const Banner = Styled.div`
      margin-bottom: 2rem;
      .gatsby-image-wrapper {
        max-height: 12rem;
        img {
          right: 0 !important;
          margin: auto !important;
          width: ${crop ? '100%' : 'auto'} !important;
        }
      }
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
      padding-right: 4rem;
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
      margin-bottom: 0.25rem;
      > span:not(:first-child) {
        padding-left: 0.5rem;
      }
      > span:not(:last-child) {
        padding-right: 0.5rem;
      }
    `
    const GitHubButton = Styled(GenericButton)`
      && {
        svg {
          font-size: 0.675rem;
        }
        a {
          padding: 0.375rem 0.5rem;
          border: 2px solid ${props => props.theme.text};
          font-size: 1rem;
        }
      }
    `
    const NavTabs = Styled.div`
      display: flex;
      border-top: 0.125rem solid ${props => props.theme.text};
    `
    const NavButton = Styled(GenericButton)`
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
        edge => <TextPreview key={edge.node.id} post={edge.node}/>
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
      <ProjectPostWrapper>
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
                <MetaText
                  type='internal'
                  icon={['fas', 'tags']}
                  texts={markdownRemark.frontmatter.tags}
                  links={markdownRemark.fields.tagSlugs}
                />
              </div>
            </Left>
            <Right>
              <div>
                {frontmatter.github &&
                  <ButtonRow>
                    <GitHubButton
                      type='external'
                      to={`//github.com/${frontmatter.github}/watchers`}
                      text={`Watch ${this.state.watchCount}`}
                      icon={['fas', 'eye']}
                    />
                    <GitHubButton
                      type='external'
                      to={`//github.com/${frontmatter.github}/stargazers`}
                      text={`Star ${this.state.starCount}`}
                      icon={['fas', 'star']}
                    />
                    <GitHubButton
                      type='external'
                      to={`//github.com/${frontmatter.github}/network`}
                      text={`Fork ${this.state.forkCount}`}
                      icon={['fas', 'code-branch']}
                    />
                  </ButtonRow>
                }
              </div>
              <div>
                {this.state.license && 
                  <MetaText
                    type='text'
                    icon={['fas', 'balance-scale']}
                    texts={[`${this.state.license} License`]}
                  />
                }
                {frontmatter.github &&
                  <MetaText
                    type='external'
                    icon={['fab', 'github']}
                    texts={[`github.com/${frontmatter.github}`]}
                    links={[`//github.com/${frontmatter.github}`]}
                  />
                }
                {this.state.website &&
                  <MetaText
                    type='external'
                    icon={['fas', 'link']}
                    texts={[this.state.website]}
                    links={[`//${this.state.website}`]}
                  />
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
      </ProjectPostWrapper>
    )
  }
}

export default ProjectPost

export const pageQuery = graphql`
  query ProjectPostBySlug($slug: String!, $targetTag: String!) {
    allMarkdownRemark(
      filter: {fields: {kind: {eq: "articles"} targetTag: {regex: $targetTag}} frontmatter: {draft: {ne: true}}}, 
      sort: {order: DESC, fields: [fields___date]}
    ) {
      edges {
        node {
          ...TextPreviewFragment
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
            sizes(maxWidth: 1600, cropFocus: CENTER) {
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
        feature
        draft
        tags
        github
        website
        allowCropping
        misc {
          childMarkdownRemark {
            htmlAst
          }
        }
      }
    }
  }
`
