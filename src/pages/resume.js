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
import SEO from '../components/SEO'
import GenericButton from '../components/GenericButton'
import SmartLink from '../components/SmartLink'
import MetaText from '../components/MetaText'
import { LightTheme, MUIBoxShadow } from '../utils/Theme'
import { FontSans, TextI } from '../utils/Text'
import { PaperHeight, PaperWidthContainer, PaperHeightContainer, PaperMinHeightContainer } from '../utils/Container'

const resumeTypeOptions = [
  { value: 'CV', label: 'All (CV)' },
  { value: 'Software', label: 'Software' },
  { value: 'Web', label: 'Web' },
  { value: 'Hardware', label: 'Hardware' }
]

const Body = Styled.div`
  h2, h3 {
    position: relative;
    margin-top: 0;
    margin-bottom: 0;
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
    padding-top: 0;
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
    padding-top: 0;
  }
`
const SideSection = Styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
`
const SideSubsection = Styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.75rem;
`
const SideSubsectionList = Styled.div`
  padding-top: 0.75rem;
`

class ResumePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      multiPaged: false,
      resumeTypeSelected: resumeTypeOptions[0],
      canvasLoaded: false,
      windowWidth: 1920,
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
      ],
      originalContent: null,
      structuredContent: null
    }
    this.handleResumeSelect = this.handleResumeSelect.bind(this)
    this.handleDownloadPdf = this.handleDownloadPdf.bind(this)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.convertSVGToImage(this.state.icons)
    const { resumeTypeSelected, icons } = this.state
    const { data } = this.props
    const { allExperienceJson, allProjectsJson, allProjectsRemark, 
      allEducationJson, skillsJson, interestsJson, techJson, } = data

    let originalContent = {
      leftColumn: [
        {
          experience: [],
          projects: []
        }
      ],
      rightColumn: [
        {
          education: [],
          skills: [],
          tech: [],
          interests: []
        }
      ]
    }

    // Experience section
    const experienceSection = <SideSection ref={(experienceRef) => this.experienceRef = experienceRef}>
      <h2>EXPERIENCE</h2>
      {allExperienceJson.edges.filter((edge) => {
        const { node } = edge
        if(node.tags.includes(resumeTypeSelected.value) || resumeTypeSelected.value === 'CV') {
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
    originalContent.leftColumn[0].experience = experienceSection

    // Projects section
    const projectsSection = <SideSection ref={(projectsRef) => this.projectsRef = projectsRef}>
      <h2>PROJECTS</h2>
      {allProjectsJson.edges.filter((edge) => {
        const { node } = edge
        if(node.tags.includes(resumeTypeSelected.value) || resumeTypeSelected.value === 'CV') {
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
                  <b> // </b>
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
                  <b> // </b>
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
    originalContent.leftColumn[0].projects = projectsSection

    // Education side section
    const educationSection = <SideSection ref={(educationRef) => this.educationRef = educationRef}>
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
    originalContent.rightColumn[0].education = educationSection

    // Skills side section
    const skillsSection = <SideSection ref={(skillsRef) => this.skillsRef = skillsRef}>
      <h2>SKILLS</h2>
      <SideSubsection>
        <h3>SOFTWARE</h3>
        {skillsJson.software.map((skill, i) => {
          return (
            <span key={i}>{skill}</span>
          )
        })}
      </SideSubsection>
      {['Software', 'Web', 'CV'].includes(resumeTypeSelected.value) && 
        <SideSubsection>
          <h3>WEB</h3>
          {skillsJson.web.map((skill, i) => {
            return (
              <span key={i}>{skill}</span>
            )
          })}
        </SideSubsection>
      }
      {['Hardware', 'CV'].includes(resumeTypeSelected.value) && 
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
    originalContent.rightColumn[0].skills = skillsSection

    // Tech side section
    let techType
    if(resumeTypeSelected.value === 'Software') {
      techType = techJson.software
    }
    else if(resumeTypeSelected.value === 'Web') {
      techType = techJson.web
    }
    else if(resumeTypeSelected.value === 'Hardware') {
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
    const techSection = <SideSection ref={(techRef) => this.techRef = techRef}>
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
    originalContent.rightColumn[0].tech = techSection

    // Interests side section
    const interestsSection = <SideSection ref={(interestsRef) => this.interestsRef = interestsRef}>
      <h2>INTERESTS</h2>
      <SideSubsection>
        {interestsJson.buzzwords.map((buzzword, i) => {
          return (
            <span key={i}>{buzzword}</span>
          )
        })}
      </SideSubsection>
    </SideSection>
    originalContent.rightColumn[0].interests = interestsSection

    // Structure originalContent into page-based columns
    const structuredContent = [<Body key={0} className='body'>
      <BodyLeft>
        {originalContent.leftColumn[0].experience}
        {originalContent.leftColumn[0].projects}
      </BodyLeft>
      <BodyColumn/>
      <BodyRight>
        {originalContent.rightColumn[0].education}
        {originalContent.rightColumn[0].skills}
        {originalContent.rightColumn[0].tech}
        {originalContent.rightColumn[0].interests}
      </BodyRight>
    </Body>]

    this.setState({
      canvasLoaded: true,
      originalContent,
      structuredContent
    })
  }

  componentDidUpdate() {
    if(this.state.multiPaged === false) {
      const experienceNodes = this.state.originalContent.leftColumn[0].experience.props.children
      const projectNodes = this.state.originalContent.leftColumn[0].projects.props.children
      const educationNodes = this.state.originalContent.rightColumn[0].education.props.children
      const skillNodes = this.state.originalContent.rightColumn[0].skills.props.children
      const techNodes = this.state.originalContent.rightColumn[0].tech.props.children
      const interestNodes = this.state.originalContent.rightColumn[0].interests.props.children
      const headerHeight = this.headerRef.clientHeight
      const paperPadding = 32
      const maxFirstPageHeight = PaperHeight.xl - 16 - headerHeight - paperPadding * 2
      const maxNthPageHeight = PaperHeight.xl - 16 - paperPadding * 2
      let currentPage
      let currentHeight
      let newContent = {
        leftColumn: [
          {
            experience: [],
            projects: []
          }
        ],
        rightColumn: [
          {
            education: [],
            skills: [],
            tech: [],
            interests: []
          }
        ]
      }
      
      currentPage = 0
      currentHeight = 0

      // Parse through experience nodes
      currentHeight += this.experienceRef.children[0].clientHeight + this.experienceRef.children[1].clientHeight
      if((currentPage === 0 && currentHeight > maxFirstPageHeight) ||
          (currentPage !== 0 && currentHeight > maxNthPageHeight)
      ) {
        currentPage++
        currentHeight = this.experienceRef.children[0].clientHeight + this.experienceRef.children[1].clientHeight
        newContent.leftColumn.push({experience: [], projects: []})
      }
      newContent.leftColumn[currentPage].experience.push(experienceNodes[0])
      newContent.leftColumn[currentPage].experience.push(experienceNodes[1][0])
      for(let i = 1; i < experienceNodes[1].length; i++) {
        currentHeight += this.experienceRef.children[i+1].clientHeight
        if((currentPage === 0 && currentHeight > maxFirstPageHeight) ||
          (currentPage !== 0 && currentHeight > maxNthPageHeight)
        ) {
          currentPage++
          currentHeight = this.experienceRef.children[i+1].clientHeight
          newContent.leftColumn.push({experience: [], projects: []})
        }
        newContent.leftColumn[currentPage].experience.push(experienceNodes[1][i])
      }
      // Parse through project nodes
      currentHeight += this.projectsRef.children[0].clientHeight + this.projectsRef.children[1].clientHeight
      if((currentPage === 0 && currentHeight > maxFirstPageHeight) ||
          (currentPage !== 0 && currentHeight > maxNthPageHeight)
      ) {
        currentPage++
        currentHeight = this.projectsRef.children[0].clientHeight + this.projectsRef.children[1].clientHeight
        newContent.leftColumn.push({experience: [], projects: []})
      }
      newContent.leftColumn[currentPage].projects.push(projectNodes[0])
      newContent.leftColumn[currentPage].projects.push(projectNodes[1][0])
      for(let i = 1; i < projectNodes[1].length; i++) {
        currentHeight += this.projectsRef.children[i+1].clientHeight
        if((currentPage === 0 && currentHeight > maxFirstPageHeight) ||
          (currentPage !== 0 && currentHeight > maxNthPageHeight)
        ) {
          currentPage++
          currentHeight = this.projectsRef.children[i+1].clientHeight
          newContent.leftColumn.push({experience: [], projects: []})
        }
        newContent.leftColumn[currentPage].projects.push(projectNodes[1][i])
      }
      const leftPages = currentPage

      currentPage = 0
      currentHeight = 0

      // Parse through education nodes
      currentHeight += this.educationRef.children[0].clientHeight + this.educationRef.children[1].clientHeight
      if((currentPage === 0 && currentHeight > maxFirstPageHeight) ||
          (currentPage !== 0 && currentHeight > maxNthPageHeight)
      ) {
        currentPage++
        currentHeight = this.educationRef.children[0].clientHeight + this.educationRef.children[1].clientHeight
        newContent.rightColumn.push({education: [], skills: [], tech: [], interests: []})
      }
      newContent.rightColumn[currentPage].education.push(educationNodes[0])
      newContent.rightColumn[currentPage].education.push(educationNodes[1][0])
      for(let i = 1; i < educationNodes[1].length; i++) {
        currentHeight += this.educationRef.children[i+1].clientHeight
        if((currentPage === 0 && currentHeight > maxFirstPageHeight) ||
          (currentPage !== 0 && currentHeight > maxNthPageHeight)
        ) {
          currentPage++
          currentHeight = this.educationRef.children[i+1].clientHeight
          newContent.rightColumn.push({education: [], skills: [], tech: [], interests: []})
        }
        newContent.rightColumn[currentPage].education.push(educationNodes[1][i])
      }
      // Parse through skill nodes
      for(let i = 0, j = 0; i < skillNodes.length;) {
        if(skillNodes[i] === false) {
          i++
        }
        else {
          currentHeight += this.skillsRef.children[j].clientHeight
          if((currentPage === 0 && currentHeight > maxFirstPageHeight) ||
            (currentPage !== 0 && currentHeight > maxNthPageHeight)
          ) {
            currentPage++
            currentHeight = this.skillsRef.children[j].clientHeight
            newContent.rightColumn.push({education: [], skills: [], tech: [], interests: []})
          }
          newContent.rightColumn[currentPage].skills.push(skillNodes[i])
          i++
          j++
        }
      }
      // Parse through tech nodes
      currentHeight += this.techRef.children[0].clientHeight + this.techRef.children[1].clientHeight
      if((currentPage === 0 && currentHeight > maxFirstPageHeight) ||
          (currentPage !== 0 && currentHeight > maxNthPageHeight)
      ) {
        currentPage++
        currentHeight = this.techRef.children[0].clientHeight + this.techRef.children[1].clientHeight
        newContent.rightColumn.push({education: [], skills: [], tech: [], interests: []})
      }
      newContent.rightColumn[currentPage].tech.push(techNodes[0])
      newContent.rightColumn[currentPage].tech.push(techNodes[1])
      for(let i = 2; i < techNodes.length; i++) {
        currentHeight += this.techRef.children[i].clientHeight
        if((currentPage === 0 && currentHeight > maxFirstPageHeight) ||
          (currentPage !== 0 && currentHeight > maxNthPageHeight)
        ) {
          currentPage++
          currentHeight = this.techRef.children[i].clientHeight
          newContent.rightColumn.push({education: [], skills: [], tech: [], interests: []})
        }
        newContent.rightColumn[currentPage].tech.push(techNodes[i])
      }
      // Parse through interests nodes
      currentHeight += this.interestsRef.children[0].clientHeight + this.interestsRef.children[1].clientHeight
      if((currentPage === 0 && currentHeight > maxFirstPageHeight) ||
          (currentPage !== 0 && currentHeight > maxNthPageHeight)
      ) {
        currentPage++
        currentHeight = this.interestsRef.children[0].clientHeight + this.interestsRef.children[1].clientHeight
        newContent.rightColumn.push({education: [], skills: [], tech: [], interests: []})
      }
      newContent.rightColumn[currentPage].interests.push(interestNodes[0])
      newContent.rightColumn[currentPage].interests.push(interestNodes[1])
      for(let i = 2; i < interestNodes.length; i++) {
        currentHeight += this.interestsRef.children[i].clientHeight
        if((currentPage === 0 && currentHeight > maxFirstPageHeight) ||
          (currentPage !== 0 && currentHeight > maxNthPageHeight)
        ) {
          currentPage++
          currentHeight = this.interestsRef.children[i].clientHeight
          newContent.rightColumn.push({education: [], skills: [], tech: [], interests: []})
        }
        newContent.rightColumn[currentPage].interests.push(interestNodes[i])
      }
      const rightPages = currentPage

      // Structure the content
      const maxPageCount = Math.max(leftPages, rightPages) + 1
      let structuredContent = []
      for(let i = 0; i < maxPageCount; i++) {
        structuredContent.push(
          <Body key={i} className={i > 0 ? 'extra-page page-break' : 'body'}>
            {newContent.leftColumn[i] && 
              <BodyLeft>
                {newContent.leftColumn[i].experience.length !== 0 && 
                  <SideSection>
                    {newContent.leftColumn[i].experience}
                  </SideSection>
                }
                {newContent.leftColumn[i].projects.length !== 0 && 
                  <SideSection>
                    {newContent.leftColumn[i].projects}
                  </SideSection>
                }
              </BodyLeft>
            }
            {newContent.leftColumn[i] && newContent.rightColumn[i] && 
              <BodyColumn/>
            }
            {newContent.rightColumn[i] && 
              <BodyRight>
                {newContent.rightColumn[i].education.length !== 0 && 
                  <SideSection>
                    {newContent.rightColumn[i].education}
                  </SideSection>
                }
                {newContent.rightColumn[i].skills.length !== 0 && 
                  <SideSection>
                    {newContent.rightColumn[i].skills}
                  </SideSection>
                }
                {newContent.rightColumn[i].tech.length !== 0 && 
                  <SideSection>
                    {newContent.rightColumn[i].tech}
                  </SideSection>
                }
                {newContent.rightColumn[i].interests.length !== 0 && 
                  <SideSection>
                    {newContent.rightColumn[i].interests}
                  </SideSection>
                }
              </BodyRight>
            }
          </Body>
        )
      }
      console.log(structuredContent)
    
      this.setState({
        multiPaged: true,
        structuredContent
      })
    }
  }

  componentWillUnmount() {
    //window.removeEventListener('resize', this.updateWindowDimensions);
  }

  handleResumeSelect = (resumeTypeSelected) => {
    if(resumeTypeSelected.value !== this.state.resumeTypeSelected.value) {
      this.setState({resumeTypeSelected})
    }
  }

  handleDownloadPdf = () => {
    const { author } = this.props.data.site.siteMetadata
    const today = new Date()
    const resumeType = this.state.resumeTypeSelected.value
    const title = `${author} ${resumeType} Resume`
    let pdfScale

    //if(this.state.windowWidth >= PaperMinWidth.xl) {
      pdfScale = 0.5
    // }
    // else if(this.state.windowWidth >= PaperMinWidth.l) {
    //   pdfScale = 0.75
    // }
    // else if(this.state.windowWidth >= PaperMinWidth.m) {
    //   pdfScale = 1.0
    // }
    // else {
    //   pdfScale = 4/3
    // }
    //this.setState({pdfScale: pdfScale})

    savePDF(ReactDOM.findDOMNode(this.resumeRef), {
      title: title,
      subject: `${resumeType} Resume`,
      author: author,
      creator: author,
      producer: author,
      keywords: 'Kyle Carson Resume Computer Engineering Software Engineering Computer Science',
      fileName: `${title} ${today.toLocaleDateString("en-US").replace(/\//g, '-')}.pdf`,
      paperSize: 'Letter',
      scale: pdfScale,
      forcePageBreak: ".page-break",
      keepTogether: ".keep-together"
    })
  }

  updateWindowDimensions() {
    //this.setState({windowWidth: window.innerWidth})
  }

  convertSVGToImage(icons) {
    let canv = this.refs.canvas
    if(!this.state.canvasLoaded) {
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
    const { allSocialJson, allExperienceJson, headshot, santahat, favicon } = data
    const now = new Date()
    let extraPages = []
    
    const ResumePageWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 2rem;
      padding: 2rem;
    `
    const FilterWrapper = Styled.div`
      display: flex;
      width: 100%;
      margin: 1rem 0;
      > div:nth-child(1) {
        width: ${100/3}%;
        margin: 1rem 0.5rem 1rem 0;
      }
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
        borderRadius: '0.5rem',
        border: '0.125rem solid #6ecfff',
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
    const DownloadButton = Styled(GenericButton)`
      && {
        margin: 1rem 0 1rem 0.5rem;
        > button {
          height: 100%;
          > span {
            display: flex;
            > svg {
              align-self: center;
            }
          }
        }
      }
    `
    const ResumePages = Styled.div`
      display: flex;
      flex-direction: column;
      > div:not(:first-child) {
        margin-top: 2rem;
      }
    `
    // let ResumeContainer
    // if(this.state.multiPaged) {
    //   ResumeContainer = Styled(PaperHeightContainer)`
    //     box-shadow: ${MUIBoxShadow};
    //   `
    // }
    // else {
    //   ResumeContainer = Styled(PaperMinHeightContainer)`
    //     box-shadow: ${MUIBoxShadow};
    //   `
    // }
    const ResumeContainer = Styled(PaperMinHeightContainer)`
      box-shadow: ${MUIBoxShadow};
      
    `
    const ResumeWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 2rem;
      font-size: 1rem;
      line-height: 1.375;
      color: ${props => props.theme.text};
      background-color: white;
      .body {
        display: flex;
      }
      .extra-page {
        display: none;
      }
      &&.separate-page {
        .extra-page {
          display: flex;
        }
      }
    `
    const Header = Styled.div`
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
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
      margin-top: 0.5rem;
      margin-left: auto;
      margin-right: auto;
      font-size: 1.125rem;
    `

    // Social Links in Header
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

    // Current Job status in Header
    const currentJob = allExperienceJson.edges[0].node
    const statusSection = <TextI>
      I am currently a {currentJob.title} at {currentJob.company.text} in {currentJob.location}
    </TextI>

    if(this.state.structuredContent !== null) {
      extraPages = this.state.structuredContent.slice(1)
    }

    return (
      <BaseLayout>
        <SEO
          pathname={this.props.location.pathname}
          title='Resume'
          description="My personal, professional, and educational experiences"
        />
        <ResumePageWrapper>
          {!canvasLoaded && <canvas ref='canvas' style={{ display: 'none' }}/>}
          <PaperWidthContainer>
            <FilterWrapper>
              <Select
                name='resume'
                options={resumeTypeOptions}
                value={resumeTypeSelected}
                onChange={this.handleResumeSelect}
                isSearchable={false}
                styles={selectStyles}
              />
              <DownloadButton
                type='action'
                text='Download'
                icon={['fas', 'download']}
                func={this.handleDownloadPdf}
              />
            </FilterWrapper>
          </PaperWidthContainer>
          <ThemeProvider theme={LightTheme}>
            <ResumePages>
              <ResumeContainer>
                <ResumeWrapper className='resume-root' ref={(resumeRef) => this.resumeRef = resumeRef}>
                  <Header ref={(headerRef) => this.headerRef = headerRef}>
                    <HeaderTop>
                      <HeaderLeft>
                        <NameWrapper>
                          <Headshot>
                            {headshot &&
                              <Img className='headshot' fixed={headshot.fixed} alt='Me'/>
                            }
                            {santahat && now.getMonth()+1 === 12 &&
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
                  {this.state.structuredContent}
                </ResumeWrapper>
              </ResumeContainer>
              {extraPages.length > 0 && extraPages.map((page, i) => {
                return (
                  <ResumeContainer key={i}>
                    <ResumeWrapper className='resume-root separate-page'>
                      {page}
                    </ResumeWrapper>
                  </ResumeContainer>
                )
              })}
            </ResumePages>
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
