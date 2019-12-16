import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import ReactMarkdown from 'react-markdown'
import Styled from 'styled-components'
import { Flex } from '@rebass/grid'
import RehypeReact from 'rehype-react'
import Select from 'react-select'

import BaseLayout from '../components/BaseLayout'
import SEO from '../components/SEO'
import GenericButton from '../components/GenericButton'
import MetaText from '../components/MetaText'
import TextPreview from '../components/TextPreview'
import { ResMinWidthEm, MediaMin } from '../utils/Responsive'
import AjaxGet from '../utils/Ajax'
import { MUIBoxShadow } from '../utils/Theme'

const RenderAst = new RehypeReact({
  createElement: React.createElement,
  components: {},
}).Compiler
const tabOptions = [
  { value: 'about', label: 'About' },
  { value: 'articles', label: 'Articles' },
  { value: 'readme', label: 'README' },
]
const NoResultsText = Styled.span`
  width: 100%;
  margin-top: 2em;
  margin-bottom: 1em;
  font-size: 2em;
  font-style: italic;
  text-align: center;
`

class ProjectPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      watchCount: '',
      starCount: '',
      forkCount: '',
      license: '',
      website: '',
      tabSelected: tabOptions[0],
      readme: '',
      contents: []
    }
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  componentDidMount() {
    const { htmlAst } = this.props.data.markdownRemark
    const { github, website } = this.props.data.markdownRemark.frontmatter
    const reg = /\[([^#]+)]\(#.+?\)/g
    let watchCount
    let starCount
    let forkCount
    let license
    let readme
    let homepage
    let site

    if(github) {
      this.xhr = AjaxGet(`//api.github.com/repos/${github}`, (res) => {
        if(!res) {
          return
        }
        watchCount = res['subscribers_count']
        starCount = res['stargazers_count']
        forkCount = res['forks_count']
        if(res['license'] !== null) {
          license = res['license']['spdx_id']
        }
        if(res['homepage'] !== null && res['homepage'] !== '' && !res['homepage'].includes('carsonkk')) {
          homepage = res['homepage']
        }
        site = website ? website : homepage
        this.setState({
          watchCount,
          starCount,
          forkCount,
          license,
          website: site,
        })
      })
      this.xhr = AjaxGet(`//api.github.com/repos/${github}/readme`, (res) => {
        if(!res) {
          return
        }
        readme = atob(res['content']).replace(reg, '$1')
        this.setState({
          readme
        })
      })
    }
    else if(website) {
      this.setState({
        website: website,
      })
    }
    this.setState({
      contents: [RenderAst(htmlAst)]
    })
  }

  handleTabChange = (tabSelected) => {
    const { readme } = this.state
    const { markdownRemark, allMarkdownRemark } = this.props.data
    const { htmlAst, frontmatter } = markdownRemark
    let contents

    if(tabSelected.value !== this.state.tabSelected.value) {
      if(tabSelected.value === tabOptions[0].value) {
        contents = [RenderAst(htmlAst)]
      }
      else if(tabSelected.value === tabOptions[1].value && allMarkdownRemark) {
        contents = [allMarkdownRemark.edges.map(
          edge => <TextPreview key={edge.node.id} data={edge.node}/>
        )]
      }
      else if(tabSelected.value === tabOptions[2].value && readme !== '') {
        contents = [<ReactMarkdown key={"readme"} className="readme" source={readme}/>]
      }

      if(contents === undefined) {
        contents = [<NoResultsText key={0}>Nothing here yet</NoResultsText>]
      }
      this.setState({
        tabSelected,
        contents
      })
    }
  }

  componentWillUnmount() {
    if(this.xhr) {
      this.xhr.abort()
    }
  }

  render() {
    const { tabSelected, contents, readme } = this.state
    const { markdownRemark, allMarkdownRemark } = this.props.data
    const { frontmatter } = markdownRemark
    const crop = (frontmatter.allowCropping === false) ? false : true
    const showSubpageDropdown = allMarkdownRemark !== null || readme !== ''
    const transparentLogo = (frontmatter.transparentLogo === true) ? true : false
    const srcSetRegex = /,\n(.*) .*$/g
    let seoImg = null

    if(frontmatter.banner) {
      seoImg = srcSetRegex.exec(frontmatter.banner.childImageSharp.fluid.srcSet)
      seoImg = seoImg[1]
    } 
    else if(frontmatter.logo) {
      seoImg = srcSetRegex.exec(frontmatter.logo.childImageSharp.fixed.srcSet)
      seoImg = seoImg[1]
    }

    const Project = Styled.div`
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
    `
    let Banner = crop ? Styled.div`
      flex: 0 0 22em;
      div {
        position: fixed;
        width: 100%;
        height: 100vh;
        top: 0;
      }
    ` : Styled.div`
      width: 100%;
      box-sizing: border-box;
      margin-left: auto;
      margin-right: auto;
      padding-top: 1em;
      padding-left: 2em;
      padding-right: 2em;
      ${MediaMin.xs`
        padding-left: 4em;
        padding-right: 4em;
      `}
      ${MediaMin.s`
        padding-left: 8em;
        padding-right: 8em;
      `}
      ${MediaMin.m`
        width: ${ResMinWidthEm.s};
        padding-left: 0;
        padding-right: 0;
      `}
    `
    const ShadowWrapper = crop ? Styled.div`
      position: relative;
      flex: 1;
      box-shadow: 0em 0em 1.5em -0.25em black;
      background-color: ${props => props.theme.primary};
    ` : Styled.div``
    const Logo = Styled.div`
      height: 100%;
      .gatsby-image-wrapper {
        border-radius: 0.375em;
        box-shadow: ${transparentLogo ? 'none' : MUIBoxShadow};
      }
    `
    const Name = Styled.h1`
      margin-bottom: 0;
      font-size: 4em;
      text-align: center;
      ${MediaMin.m`
        text-align: left;
      `}
    `
    const Description = Styled.span`
      font-style: italic;
      text-align: center;
      ${MediaMin.m`
        text-align: left;
      `}
    `
    const GitHubButton = Styled(GenericButton)`
      && {
        svg {
          font-size: 0.675em;
        }
        a {
          padding: 0.375em 0.5em;
          border: 2px solid ${props => props.theme.text};
          font-size: 1em;
        }
      }
    `
    const SelectWrapper = Styled(Flex)`
      min-width: 10em;
    `
    const selectStyles = {
      control: (provided) => ({
        ...provided,
        minHeight: '48px',
        height: '100%',
        borderStyle: 'none',
        boxShadow: `${MUIBoxShadow}`
      }),
      valueContainer: (provided) => ({
        ...provided,
        cursor: 'text'
      }),
      clearIndicator: (provided) => ({
        ...provided,
        cursor: 'pointer'
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        cursor: 'pointer'
      }),
      placeholder: (provided) => ({
        ...provided,
        color: '#9e9e9e'
      }),
      multiValue: (provided) => ({
        ...provided,
        borderRadius: '0.25em',
        border: '0.125em solid #6ecfff',
        color: '#2a2a2a',
        backgroundColor: 'white'
      }),
      multiValueRemove: (provided) => ({
        ...provided,
        cursor: 'pointer'
      }),
      option: (provided) => ({
        ...provided,
        cursor: 'pointer',
        color: '#2a2a2a',
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: '#6ecfff'
        }
      }),
    }
    const PostBody = Styled(Flex)`
      min-height: 12em;
      .readme {
        max-width: 100%;
        overflow-x: auto;
        blockquote {
          padding: 0 1em;
          color: ${props => props.theme.caption};
          border-left: 0.25em solid ${props => props.theme.caption};
          ::before, ::after {
            display: none;
          }
          p {
            margin: 0;
            font-size: 1.25em;
            font-style: normal;
            text-align: left;
          }
        }
      }
    `

    return (
      <BaseLayout>
        <SEO
          pathname={this.props.location.pathname}
          title={frontmatter.title}
          description={frontmatter.description}
          image={seoImg}
        />
        <Project>
          {frontmatter.banner && 
            <Banner>
              <div>
                <Img fluid={frontmatter.banner.childImageSharp.fluid} alt="Banner"/>
              </div>
            </Banner>
          }
          <ShadowWrapper>
            <Flex flexDirection="column" width={[1, 1, 1, 1, ResMinWidthEm.s]} mx="auto" px={[4, 5, 6, 6, 0]} pt={5}>
              <Flex flexDirection="column">
                <Flex flexDirection={["column", "column", "column", "row"]}>
                  <Flex justifyContent={["space-between", "space-between", "space-between", "flex-start"]} width={[1]} mr={[0, 0, 0, 4]}>
                    <Flex flexDirection="column" justifyContent="flex-start" alignItems={["center", "center", "center", "flex-start"]} mx={["auto", "auto", "auto", 0]}>
                      <Flex flexDirection={["column", "column", "column", "row"]} alignItems="center" mb={2}>
                        {frontmatter.logo &&
                          <Logo>
                            <Img fixed={frontmatter.logo.childImageSharp.fixed} alt="logo"/>
                          </Logo>
                        }
                        <Name>{frontmatter.title}</Name>
                      </Flex>
                      <Description>{frontmatter.description}</Description>
                      <Flex flexDirection="column" alignItems="flex-start" mt={2} width={[1]}>
                        {markdownRemark.frontmatter.tags && 
                          <MetaText
                            type='internal'
                            icon={['fas', 'tags']}
                            texts={markdownRemark.frontmatter.tags}
                            links={Array(markdownRemark.frontmatter.tags.length).fill('/search')}
                            linkStates={markdownRemark.frontmatter.tags.map(tag => ({tag: tag}))}
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
                        {frontmatter.github &&
                          <MetaText
                            type='external'
                            icon={['fab', 'github']}
                            texts={[`github.com/${frontmatter.github}`]}
                            links={[`//github.com/${frontmatter.github}`]}
                          />
                        }
                        {this.state.license && 
                          <MetaText
                            type='text'
                            icon={['fas', 'balance-scale']}
                            texts={[`${this.state.license} License`]}
                          />
                        }
                      </Flex>
                    </Flex>
                  </Flex>
                  {(frontmatter.github || showSubpageDropdown) &&
                    <Flex flexDirection="column" justifyContent={["center", "center", "center", "flex-start"]} mx="auto" mt={[4, 4, 4, 0]}>
                      {frontmatter.github &&
                        <Flex justifyContent={["center", "center", "center", "flex-end"]} width={[1]} mb={4}>
                          <Flex pr={[3, 3, 3, 2]}>
                            <GitHubButton
                              type='external'
                              to={`//github.com/${frontmatter.github}/watchers`}
                              text={`Watch ${this.state.watchCount}`}
                              icon={['fas', 'eye']}
                            />
                          </Flex>
                          <Flex px={[3, 3, 3, 2]}>
                            <GitHubButton
                              type='external'
                              to={`//github.com/${frontmatter.github}/stargazers`}
                              text={`Star ${this.state.starCount}`}
                              icon={['fas', 'star']}
                            />
                          </Flex>
                          <Flex pl={[3, 3, 3, 2]}>
                            <GitHubButton
                              type='external'
                              to={`//github.com/${frontmatter.github}/network`}
                              text={`Fork ${this.state.forkCount}`}
                              icon={['fas', 'code-branch']}
                            />
                          </Flex>
                        </Flex>
                      }
                      {showSubpageDropdown &&
                        <SelectWrapper justifyContent={["center", "center", "center", "flex-end"]} mb={3}>
                          <Select
                            name="tabs"
                            options={tabOptions}
                            onChange={this.handleTabChange}
                            value={tabSelected}
                            isSearchable={false}
                            styles={selectStyles}
                            className="react-select-base"
                          />
                        </SelectWrapper>
                      }
                    </Flex>
                  }
                  
                </Flex>
              </Flex>
              <PostBody width={1} pt={5}>
                {contents}
              </PostBody>
            </Flex>
          </ShadowWrapper>
        </Project>
      </BaseLayout>
    )
  }
}

export default ProjectPost

export const pageQuery = graphql`
  query($slug: String!, $pointer: String!) {
    allMarkdownRemark(
      filter: {fields: {type: {eq: "article"} pointer: {regex: $pointer}} frontmatter: {draft: {ne: true}}}, 
      sort: {order: DESC, fields: [frontmatter___created]}
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
      }
      frontmatter {
        banner {
          childImageSharp {
            fluid(maxWidth: 2560, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        logo {
          childImageSharp {
            fixed(width: 100, height: 100, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        title
        description
        created
        updated
        feature
        draft
        tags
        github
        website
        allowCropping
        transparentLogo
      }
    }
  }
`
