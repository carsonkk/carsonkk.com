import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Styled, { ThemeProvider } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'
import { savePDF } from '@progress/kendo-react-pdf'
import canvg from 'canvg'
import _ from 'lodash'

import '../css/resume.css'
import BaseLayout from '../components/BaseLayout'
import GenericButton from '../components/GenericButton'
import SmartLink from '../components/SmartLink'
import MetaText from '../components/MetaText'
import { LightTheme } from '../utils/Theme'
import { FontSans, TextI } from '../utils/Text'
import { PaperContainer, PaperSizedContainer, PaperMinWidth } from '../utils/Container'

const resumeTypeOptions = [
  { value: 'software', label: 'Software' },
  { value: 'web', label: 'Web' },
  { value: 'hardware', label: 'Hardware' },
  { value: 'all', label: 'All (CV)' },
]

class ResumePage extends React.Component {
  resume

  constructor(props) {
    super(props)
    this.state = {
      resumeTypeSelected: resumeTypeOptions[0],
      canvasLoaded: false,
      pdfScale: 0.5,
      windowWidth: window.innerWidth,
      icons: [
        {
          arr: ["far", "envelope"],
          color: '#d93025',
          img: null
        },
        {
          arr: ["fab", "linkedin-in"],
          color: '#0077b5',
          img: null
        },
        {
          arr: ["fab", "github"],
          color: '#000000',
          img: null
        },
        {
          arr: ["fas", "circle"],
          color: '#000000',
          img: null
        }
      ]
    }
    this.handleResumeSelect = this.handleResumeSelect.bind(this)
    this.handleDownloadPdf = this.handleDownloadPdf.bind(this)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.convertSVGToImage(this.state.icons)
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  handleResumeSelect = (resumeTypeSelected) => {
    this.setState({resumeTypeSelected})
  }

  handleDownloadPdf = () => {
    const { siteMetadata } = this.props.data.site
    const today = new Date()
    let resumeType
    let pdfScale

    if(this.state.windowWidth >= PaperMinWidth.xl) {
      pdfScale = 0.5
    }
    else if(this.state.windowWidth >= PaperMinWidth.l) {
      pdfScale = 0.75
    }
    else if(this.state.windowWidth >= PaperMinWidth.m) {
      pdfScale = 1.0
    }
    else {
      pdfScale = 4/3
    }
    this.setState({pdfScale: pdfScale})

    if(this.state.resumeTypeSelected.value === 'all') {
      resumeType = 'CV'
    }
    else {
      resumeType = this.state.resumeTypeSelected.label
    }

    savePDF(ReactDOM.findDOMNode(this.resume), {
      author: siteMetadata.author,
      creator: siteMetadata.author,
      paperSize: 'Letter',
      fileName: `Kyle Carson ${resumeType} Resume ${today.toLocaleDateString("en-US").replace(/\//g, '-')}.pdf`,
      scale: this.state.pdfScale
    })
  }

  updateWindowDimensions() {
    this.setState({windowWidth: window.innerWidth})
  }

  convertSVGToImage(icons) {
    let canv = this.refs.canvas
    if(!this.state.canvasLoaded) {
      this.setState({canvasLoaded: true})
      canv.getContext('2d')
      icons.forEach((icon) => {
        let htmlString = ReactDOMServer.renderToStaticMarkup(
          <FontAwesomeIcon icon={icon.arr} size={'4x'} style={
            {color: icon.color, height: '128px', width: '128px'}
          }/>
        )
        canvg(canv, htmlString)
        icon.img = canv.toDataURL('image/png')
      })
    }
  }

  render() {
    const { resumeTypeSelected, canvasLoaded, icons } = this.state
    const { data } = this.props
    const { siteMetadata } = data.site
    const { allSocialJson, allExperienceJson, allProjectsJson, allProjectsRemark, 
      allEducationJson, skillsJson, interestsJson, techJson, headshot, santahat, favicon } = data
    
    const ResumePageWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 2rem;
      padding: 2rem;
    `
    const FilterContainer = Styled(PaperContainer)`
      padding-bottom: 20rem;
    `
    const FilterWrapper = Styled.div`
      display: flex;
      margin: 2rem 0rem;
      > :first-child {
        min-width: 12rem;
        > div:first-child {
          transition: all 0.3s;
          color: ${props => props.theme.text};
          background-color: transparent;
          :hover, :active {
            cursor: pointer;
            color: ${props => props.theme.primary};
            background-color: ${props => props.theme.text};
            > div > div {
              color: ${props => props.theme.primary};
            }
          }
          *:focus {
            outline: none;
          }
          > div > div {
            color: ${props => props.theme.text};
          }
        }
        > div:nth-child(3) {
          transition: all 0.3s;
          color: ${props => props.theme.primary};
          background-color: ${props => props.theme.text};
          :hover, :active {
            cursor: pointer;
          }
          *:focus {
            outline: none;
          }
        }
      }
      > :not(:last-child) {
        margin-right: 2rem;
      }
      > :last-child {
        align-self: center;
        svg {
          margin-right: 0.5rem;
        }
      }
    `
    const ResumeContainer = Styled(PaperSizedContainer)`
      margin-top: -20rem;
      box-shadow: 0.5rem 0.5rem 1.5rem rgba(0,0,0,0.3);
    `
    const ResumeWrapper = Styled.div`
      padding: 2rem;
      display: flex;
      flex-direction: column;
      height: calc(100% - 4rem);
      font-size: 1rem;
      line-height: 1.375;
      color: ${props => props.theme.text};
      background-color: white;
    `
    const Header = Styled.div`
      display: flex;
      flex-direction: column;
      border-bottom: 0.125rem solid rgba(0,0,0,0.1);
    `
    const HeaderTop = Styled.div`
      display: flex;
      justify-content: space-between;
    `
    const HeaderLeft = Styled.div`
      flex: 1;
      display: flex;
      flex-direction: column;
      div {
        span {
          display: block;
          line-height: 1.25;
        }
      }
    `
    const NameWrapper = Styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      h1 {
        margin-top: 0;
        margin-bottom: 0.25rem;
        font-family: ${FontSans};
        font-size: 4rem;
      }
      span {
        font-weight: bold;
        font-size: 1.25rem;
        color: ${props => props.theme.caption};
      }
    `
    const Headshot = Styled.div`
      position: relative;
      .headshot {
        margin: 0.5rem 1rem 0 0;
        img {
          border-radius: 100%;
        }
      }
      .santa-hat {
        position: absolute;
        top: -2.875rem;
        left: -2.5rem;
      }
    `
    const HeaderRight = Styled.div`
      display: flex;
      flex-direction: column;
      margin-left: 1.5rem;
      color: ${props => props.theme.text};
    `
    const LinkText = Styled(MetaText)`
      && {
        margin: 0;
        font-size: 1.125rem;
        > div:first-child {
          svg, img, div {
            display: inline-block;
            margin-right: 0.5rem;
            width: 1em;
            height: 1em;
            vertical-align: -0.125em;
            text-align: center; 
          }
        }
      }
    `
    const HeaderBottom = Styled.div`
      margin-left: auto;
      margin-right: auto;
      margin-top: 0.5rem;
      font-size: 1.125rem;
    `
    const Body = Styled.div`
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
      height: 100%;
      h2, h3 {
        position: relative;
        margin-top: 0;
        margin-bottom: 0.25rem;
        font-family: ${FontSans};
      }
      h2 {
        padding-bottom: 0.25rem;
        font-size: 1.75em;
        ::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0.25rem;
          background-color: ${props => props.theme.color};
        }
      }
      h3 {
        font-size: 1.15em;
      }
      ul {
        margin: 0;
        li {
          position: relative;
          span {
            top: -0.125em;
            img {
              width: 0.25em;
              display: none;
            }
          }
        }
      }
    `
    const BodyLeft = Styled.div`
      flex: 1 1 77%;
      display: flex;
      flex-direction: column;
      padding-right: 1.5rem;
      > div:first-child {
        margin-top: 0;
      }
    `
    const BodyColumn = Styled.div`
      width: 0.125rem;
      background-color: rgba(0,0,0,0.1);
    `
    const BodyRight = Styled.div`
      flex: 1 1 22%;
      display: flex;
      flex-direction: column;
      padding-left: 1.5rem;
      > div:first-child {
        margin-top: 0;
      }
    `
    const SideSection = Styled.div`
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
    `
    const SideSubsection = Styled.div`
      display: flex;
      flex-direction: column;
      margin-top: 0.75rem;
    `
    const SideSubsectionList = Styled.div`
      margin-top: 0.75rem;
    `

    // Social Links
    let email, linkedin, github
    const socialLinks = allSocialJson.edges.map((edge, i) => {
      const { node } = edge
      let linkText = node.url
      let iconImg = []

      if(node.name === 'email') {
        email = i
        linkText = linkText.substring(7)
      }
      else if(node.name === 'linkedin') {
        linkedin = i
        linkText = linkText.substring(12)
      }
      else if(node.name === 'github') {
        github = i
        linkText = linkText.substring(8)
      }
      if(canvasLoaded) {
        icons.forEach((icon) => {
          if(icon.arr[1] === node.icon[1]) {
            iconImg.push(icon.img)
          }
        })
      }
      return (
        <span>
          {canvasLoaded &&
            <LinkText
              type='external'
              icon={iconImg}
              texts={[linkText]}
              links={[node.url]}
              iconType='img'
            />
          }
        </span>
      )
    })
    const home = <span>
      {canvasLoaded &&
        <LinkText
          type='internal'
          icon={[favicon.fluid]}
          texts={['carsonkk.com']}
          links={['/']}
          iconType='gimg'
        />
      }
    </span>

    // Current Job status
    const currentJob = allExperienceJson.edges[0].node
    const statusSection = <TextI>
      I am currently a {currentJob.title} at {currentJob.company.text} in {currentJob.location}
    </TextI>

    // Experience section
    const experienceSection = <SideSection>
      <h2>EXPERIENCE</h2>
      {allExperienceJson.edges.filter((edge) => {
        const { node } = edge
        if(node.tags.includes(resumeTypeSelected.value) || resumeTypeSelected.value === 'all') {
          return true
        }
        return false
      }).map((edge, i) => {
        const { node } = edge
        return(
          <SideSubsection key={i}>
            <h3>{node.title}</h3>
            <span>
              <SmartLink
                theme={LightTheme}
                type='external'
                to={node.company.url}
                text={node.company.text}
              />
              <span>, {node.location}</span>
            </span>
            <TextI>{node.begin} - {node.end}</TextI>
            <ul>
              {node.details.map((item, i) => {
                return(
                  <li key={i}>
                    <span className='fa-li'><img src={icons[3].img} alt=""/></span>
                    <span>{item}</span>
                  </li>
                )
              })}
            </ul>
          </SideSubsection>
        )
      })}
    </SideSection>

    // Projects section
    const projectsSection = <SideSection>
      <h2>PROJECTS</h2>
      {allProjectsJson.edges.filter((edge) => {
        const { node } = edge
        if(node.tags.includes(resumeTypeSelected.value) || resumeTypeSelected.value === 'all') {
          return true
        }
        return false
      }).map((edge, i) => {
        const { node } = edge
        let remark
        
        for(let pjct of allProjectsRemark.edges) {
          if(pjct.node.frontmatter.title === node.title) {
            remark = pjct.node
            break
          }
        }
        const { slug } = remark.fields
        const { github, website, description } = remark.frontmatter
        
        return(
          <SideSubsection key={i}>
            <h3>{node.title}</h3>
            <span>
              <span>
                <SmartLink
                  theme={LightTheme}
                  type='internal'
                  to={node.slug ? node.slug : slug}
                  text='Writeup'
                />
              </span>
              {(node.github || github) &&
                <span>
                  {/* eslint-disable-next-line */}
                  <span> // </span>
                  <SmartLink
                    theme={LightTheme}
                    type='external'
                    to={node.github ? node.github : `//github.com/${github}`}
                    text='GitHub'
                  />
                </span>
              }
              {(node.website || website) &&
                <span>
                  {/* eslint-disable-next-line */}
                  <span> // </span>
                  <SmartLink
                    theme={LightTheme}
                    type='external'
                    to={node.website ? node.website : `//${website}`}
                    text='Website'
                  />
                </span>
              }
            </span>
            <ul>
              <li>
                <span className='fa-li'><img src={icons[3].img} alt=""/></span>
                <span>{node.description ? node.description : description}</span>
              </li>
              {node.details.map((item, i) => {
                return(
                  <li key={i}>
                    <span className='fa-li'><img src={icons[3].img} alt=""/></span>
                    <span>{item}</span>
                  </li>
                )
              })}
            </ul>
          </SideSubsection>
        )
      })}
    </SideSection>

    // Education side section
    const educationSection = <SideSection>
      <h2>EDUCATION</h2>
      {allEducationJson.edges.map((edge, i) => {
        const { node } = edge
        return(
          <SideSubsection key={i}>
            <h3>{node.degree.fullname}</h3>
            <span>
              <SmartLink
                type='external'
                to={node.department.url}
                text={node.department.fullname}
              />
              {`, ${node.university.abbreviation}`}
            </span>
            <TextI>Class of {node.degree.class}</TextI>
            <ul>
              {node.details.map((detail, i) => {
                return (
                  <li key={i}>
                    <span className='fa-li'><img src={icons[3].img} alt=""/></span>
                    <span>{detail}</span>
                  </li>
                )
              })}
            </ul>
          </SideSubsection>
        )
      })}
    </SideSection>

    // Skills side section
    const skillsSection = <SideSection>
      <h2>SKILLS</h2>
      <SideSubsection>
        <h3>SOFTWARE</h3>
        {skillsJson.software.map((skill, i) => {
          return (
            <span key={i}>{skill}</span>
          )
        })}
      </SideSubsection>
      {['software', 'web', 'all'].includes(resumeTypeSelected.value) && 
        <SideSubsection>
          <h3>WEB</h3>
          {skillsJson.web.map((skill, i) => {
            return (
              <span key={i}>{skill}</span>
            )
          })}
        </SideSubsection>
      }
      {['hardware', 'all'].includes(resumeTypeSelected.value) && 
        <SideSubsection>
          <h3>HARDWARE</h3>
          {skillsJson.hardware.map((skill, i) => {
            return (
              <span key={i}>{skill}</span>
            )
          })}
        </SideSubsection>
      }
    </SideSection>

    // Tech side section
    let techType
    if(resumeTypeSelected.value === 'software') {
      techType = techJson.software
    }
    else if(resumeTypeSelected.value === 'web') {
      techType = techJson.web
    }
    else if(resumeTypeSelected.value === 'hardware') {
      techType = techJson.hardware
    }
    else {
      techType = {'languages': [], 'libraries': [], 'softwares': []}
      techType.languages = _.union(
        techJson.software.languages, 
        techJson.web.languages, 
        techJson.hardware.languages,
      )
      techType.libraries = _.union(
        techJson.software.libraries, 
        techJson.web.libraries, 
        techJson.hardware.libraries,
      )
      techType.softwares = _.union(
        techJson.software.softwares, 
        techJson.web.softwares, 
        techJson.hardware.softwares,
      )
    }
    const techSection = <SideSection>
      <h2>TECH</h2>
      <SideSubsectionList>
        <h3>LANGUAGES</h3>
        {techType.languages.map((language, i) => {
          let divider = ''
          if(i < techType.languages.length-1) {
            divider = <span>, </span>
          }
          return (
            <span key={i}>
              {language}{divider}
            </span>
          )
        })}
      </SideSubsectionList>
      <SideSubsectionList>
        <h3>LIBRARIES</h3>
        {techType.libraries.map((library, i) => {
          let divider = ''
          if(i < techType.libraries.length-1) {
            divider = <span>, </span>
          }
          return (
            <span key={i}>
              {library}{divider}
            </span>
          )
        })}
      </SideSubsectionList>
      <SideSubsectionList>
        <h3>SOFTWARE</h3>
        {techType.softwares.map((software, i) => {
          let divider = ''
          if(i < techType.softwares.length-1) {
            divider = <span>, </span>
          }
          return (
            <span key={i}>
              {software}{divider}
            </span>
          )
        })}
      </SideSubsectionList>
    </SideSection>

    // Interests side section
    const interestsSection = <SideSection>
      <h2>INTERESTS</h2>
      {interestsJson.buzzwords.map((buzzword, i) => {
        return (
          <span key={i}>{buzzword}</span>
        )
      })}
    </SideSection>

    return (
      <BaseLayout location={this.props.location}>
        <ResumePageWrapper>
          {!canvasLoaded && <canvas ref='canvas' style={{ display: 'none' }}/>}
          <FilterContainer>
            <FilterWrapper>
              <Select
                name='resume-type'
                options={resumeTypeOptions}
                value={resumeTypeSelected}
                onChange={this.handleResumeSelect}
                isSearchable={false}
                className='resume-select'
              />
              <GenericButton
                type='action'
                text='Download'
                icon={['fas', 'download']}
                func={this.handleDownloadPdf}
              />
            </FilterWrapper>
          </FilterContainer>
          <ThemeProvider theme={LightTheme}>
            <ResumeContainer>
              <ResumeWrapper className='resume-root' ref={(resume) => this.resume = resume}>
                <Header>
                  <HeaderTop>
                    <HeaderLeft>
                      <NameWrapper>
                        <Headshot>
                          {headshot &&
                            <Img className='headshot' fixed={headshot.fixed} alt='Me'/>
                          }
                          {santahat &&
                            <div className='santa-hat'>
                              <Img fixed={santahat.fixed} alt='Santa Hat'/>
                            </div>
                          }
                        </Headshot>
                        <div>
                          <h1>{siteMetadata.author}</h1>
                          <span>{siteMetadata.about}</span>
                        </div>
                      </NameWrapper>
                    </HeaderLeft>
                    <HeaderRight>
                      {socialLinks[email]}
                      {socialLinks[linkedin]}
                      {socialLinks[github]}
                      {home}
                    </HeaderRight>
                  </HeaderTop>
                  <HeaderBottom>
                    {statusSection}
                  </HeaderBottom>
                </Header>
                <Body>
                  <BodyLeft>
                    {experienceSection}
                    {projectsSection}
                  </BodyLeft>
                  <BodyColumn/>
                  <BodyRight>
                    {educationSection}
                    {skillsSection}
                    {techSection}
                    {interestsSection}
                  </BodyRight>
                </Body>
              </ResumeWrapper>
            </ResumeContainer>
          </ThemeProvider>
        </ResumePageWrapper>
      </BaseLayout>
    )
  }
}

export default ResumePage

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        author
        about
        text
        home
      }
    }
    allSocialJson {
      edges {
        node {
          name
          url
          text
          color
          icon
        }
      }
    }
    allExperienceJson {
      edges {
        node {
          title
          company {
            text
            url
          }
          location
          begin
          end
          details
          tags
        }
      }
    }
    allProjectsJson {
      edges {
        node {
          title
          slug
          github
          website
          description
          details
          tags
        }
      }
    }
    allProjectsRemark: allMarkdownRemark(
      filter: {fields: {type: {eq: "project"} kind: {eq: "page"}}}
      sort: {order: ASC, fields: [fields___slug]}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
            github
            website
          }
        }
      }
    }
    allEducationJson {
      edges {
        node {
          university {
            shorthand
            abbreviation
          }
          department {
            fullname
            url
          }
          degree {
            fullname
            class
          }
          details
        }
      }
    }
    skillsJson {
      software
      web
      hardware
    }
    interestsJson {
      buzzwords
    }
    techJson {
      software {
        languages
        libraries
        softwares
      }
      web {
        languages
        libraries
        softwares
      }
      hardware {
        languages
        libraries
        softwares
      }
    }
    headshot: imageSharp(fixed: {originalName: {regex: "/headshot.png/"}}) {
      fixed(width: 100, height: 100) {
        ...GatsbyImageSharpFixed
      }
    }
    santahat: imageSharp(fixed: {originalName: {regex: "/santa-hat.png/"}}) {
      fixed(width: 144) {
        ...GatsbyImageSharpFixed
      }
    }
    favicon: imageSharp(fluid: {originalName: {regex: "/favicon.png/"}}) {
      fluid(maxWidth: 128, maxHeight: 128) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`