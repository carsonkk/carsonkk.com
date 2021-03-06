import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Styled, { ThemeProvider } from 'styled-components'
import { Flex } from '@rebass/grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'
import { savePDF } from '@progress/kendo-react-pdf'
import canvg from 'canvg'
import _ from 'lodash'
import Cookies from 'universal-cookie'

import '../css/resume.css'
import BaseLayout from '../components/BaseLayout'
import SEO from '../components/SEO'
import GenericButton from '../components/GenericButton'
import SmartLink from '../components/SmartLink'
import MetaText from '../components/MetaText'
import { LightTheme, MUIBoxShadow } from '../utils/Theme'
import { FontSans, TextI } from '../utils/Text'
import { MediaMin, PaperWidth, PaperHeight } from '../utils/Responsive'

const cookies = new Cookies()
const resumeTypeOptions = [
  { value: 'CV', label: 'All (CV)' },
  { value: 'Software', label: 'Software' },
  { value: 'Web', label: 'Web' },
  { value: 'Hardware', label: 'Hardware' }
]
const smallScaleValues = [1, 1.5, 2, 2.5]
const mediumScaleValues = [1, 1.1, 1.25, 1.5]
const Body = Styled.div`
  display: flex;
  padding-top: 0.75em;
  h2, h3 {
    position: relative;
    margin-top: 0;
    margin-bottom: 0;
    font-family: ${FontSans};
  }
  h2 {
    padding-bottom: 0.25em;
    font-size: 1.5em;
    ::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: ${props => props.theme.color};
    }
  }
  h3 {
    font-size: 1.1em;
  }
  ul {
    margin: 0;
    li {
      position: relative;
      line-height: 1.375;
      span {
        top: -0.25em;
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
  padding-right: 1.5em;
  > div:first-child {
    padding-top: 0;
  }
`
const BodyColumn = Styled.div`
  width: 0.125em;
  align-self: stretch;
  background-color: rgba(0,0,0,0.1);
`
const BodyRight = Styled.div`
  flex: 1 1 22%;
  display: flex;
  flex-direction: column;
  padding-left: 1.5em;
  > div:first-child {
    padding-top: 0;
  }
`
const SideSection = Styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1em;
`
const SideSubsection = Styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.75em;
  .verbose-url {
    display: none;
  }
`
const SideSubsectionList = Styled.div`
  padding-top: 0.75em;
`

class ResumePage extends React.Component {
  constructor(props) {
    super(props)
    const resumeTypeCookie = cookies.get('resumeType')
    const resumeScaleIdxCookie = parseInt(cookies.get('resumeScaleIdx'))
    let cookiedResumeOption = resumeTypeOptions[0]

    for(let option of resumeTypeOptions) {
      if(resumeTypeCookie === option.value) {
        cookiedResumeOption = option
        break
      }
    }

    this.state = {
      resumeTypeSelected: cookiedResumeOption,
      scaleIdx: resumeScaleIdxCookie,
      originalContent: null,
      structuredContent: null,
      multiPaged: false,
      isCustomizeMode: false,
      canvasLoaded: false,
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
    this.handleScaleDown = this.handleScaleDown.bind(this)
    this.handleScaleUp = this.handleScaleUp.bind(this)
    this.buildResumeContent = this.buildResumeContent.bind(this)
  }

  componentDidMount() {
    this.convertSVGToImage(this.state.icons)
    this.buildResumeContent(this.state.resumeTypeSelected)
    this.setState({
      canvasLoaded: true
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
      if(this.experienceRef) {
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
      }
      // Parse through project nodes
      if(this.projectsRef) {
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
          <Body key={i} className={i > 0 ? 'body page-break' : 'body'}>
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
    
      this.setState({
        multiPaged: true,
        structuredContent
      })
    }
  }

  handleResumeSelect = (resumeTypeSelected) => {
    if(resumeTypeSelected.value !== this.state.resumeTypeSelected.value) {
      cookies.set('resumeType', resumeTypeSelected.value, { path: '/' })
      this.buildResumeContent(resumeTypeSelected)
      this.setState({
        multiPaged: false,
        resumeTypeSelected
      })
    }
  }

  handleDownloadPdf = () => {
    const resumeType = this.state.resumeTypeSelected.value
    const { author } = this.props.data.site.siteMetadata
    let { skillsJson, techJson, interestsJson, } = this.props.data
    if(process.env.GATSBY_CUSTOM_RESUME_FILTERING === 'true') {
      skillsJson = this.props.data.cskillsJson
      techJson = this.props.data.ctechJson
    }
    const today = new Date()
    const day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate()
    const month = today.getMonth()+1 < 10 ? "0"+(today.getMonth()+1) : today.getMonth()+1
    const year = today.getFullYear()
    const title = `${author} ${resumeType} Resume`
    const skillsMeta = [skillsJson.software.join(), skillsJson.web.join(), skillsJson.hardware.join()].join()
    const techs = {'languages': [], 'libraries': [], 'softwares': []}
    techs.languages = _.union(
      techJson.software.languages, 
      techJson.web.languages, 
      techJson.hardware.languages,
    )
    techs.libraries = _.union(
      techJson.software.libraries, 
      techJson.web.libraries, 
      techJson.hardware.libraries,
    )
    techs.softwares = _.union(
      techJson.software.softwares, 
      techJson.web.softwares, 
      techJson.hardware.softwares,
    )
    const techMeta = [techs.languages.join(), techs.libraries.join(), techs.softwares.join()].join()
    const interestsMeta = interestsJson.buzzwords.join()
    const miscMeta = "Regents Scholar, Honors Program, Computer Engineering, Software Engineering, Computer Science, BS, MS, Masters, Graduate, SB Hacks, Hackathon, Tau Beta Pi, TBP"

    savePDF(ReactDOM.findDOMNode(this.resumeRef), {
      title: title,
      subject: `${resumeType} Resume`,
      author: author,
      creator: author,
      producer: author,
      keywords: `${author},${resumeType},Resume,${skillsMeta},${techMeta},${interestsMeta},${miscMeta}`,
      fileName: `${title} ${month}-${day}-${year}.pdf`,
      paperSize: 'Letter',
      scale: 0.5,
      forcePageBreak: ".page-break"
    })
  }

  handleScaleDown() {
    const { scaleIdx } = this.state
    if(scaleIdx !== 0) {
      this.setState((prevState) => {
        cookies.set('resumeScaleIdx', (prevState.scaleIdx-1).toString(), { path: '/' })
        return {
          scaleIdx: prevState.scaleIdx-1
        }
      })
    }
  }

  handleScaleUp() {
    const { scaleIdx } = this.state
    if(scaleIdx !== smallScaleValues.length-1) {
      this.setState((prevState) => {
        cookies.set('resumeScaleIdx', (prevState.scaleIdx+1).toString(), { path: '/' })
        return {
          scaleIdx: prevState.scaleIdx+1
        }
      })
    }
  }

  buildResumeContent(resumeTypeSelected) {
    const { icons } = this.state
    const { data } = this.props
    let { allExperienceJson, allProjectsJson, allProjectsRemark, 
      allEducationJson, skillsJson, interestsJson, techJson, } = data
    if(process.env.GATSBY_CUSTOM_RESUME_FILTERING === 'true') {
      allExperienceJson = data.allCexperienceJson
      allProjectsJson = data.allCprojectsJson
      skillsJson = data.cskillsJson
      techJson = data.ctechJson
    }
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
              {/* eslint-disable-next-line */}
              <b> // </b>
              <span> {node.location}</span>
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
                <SmartLink className="readable-url"
                  theme={LightTheme}
                  type='internal'
                  to={node.slug ? node.slug : slug}
                  text='Writeup'
                />
                <SmartLink className="verbose-url"
                  theme={LightTheme}
                  type='external'
                  to={`//carsonkk.com${node.slug ? node.slug : slug}`}
                  text={`carsonkk.com${node.slug ? node.slug : slug}`}
                />
              </span>
              {(node.github || github) &&
                <span>
                  {/* eslint-disable-next-line */}
                  <b> // </b>
                  <SmartLink className="readable-url"
                    theme={LightTheme}
                    type='external'
                    to={node.github ? node.github : `//github.com/${github}`}
                    text='GitHub'
                  />
                  <SmartLink className="verbose-url"
                    theme={LightTheme}
                    type='external'
                    to={node.github ? node.github : `//github.com/${github}`}
                    text={node.github ? node.github : `github.com/${github}`}
                  />
                </span>
              }
              {(node.website || website) &&
                <span>
                  {/* eslint-disable-next-line */}
                  <b> // </b>
                  <SmartLink className="readable-url"
                    theme={LightTheme}
                    type='external'
                    to={node.website ? node.website : `//${website}`}
                    text='Website'
                  />
                  <SmartLink className="verbose-url"
                    theme={LightTheme}
                    type='external'
                    to={node.website ? node.website : `//${website}`}
                    text={node.website ? node.website : `${website}`}
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
            <TextI>Class of {node.degree.class}{process.env.GATSBY_CUSTOM_RESUME_FILTERING === 'true' && `, ${node.degree.gpa} GPA`}</TextI>
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
    const structuredContent = [<Body key={0} className="body">
      <BodyLeft>
        {originalContent.leftColumn[0].experience.props.children[1].length > 0 &&
          originalContent.leftColumn[0].experience
        }
        {originalContent.leftColumn[0].projects.props.children[1].length > 0 &&
          originalContent.leftColumn[0].projects
        }
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
      originalContent,
      structuredContent
    })
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
    const { resumeTypeSelected, canvasLoaded, icons, scaleIdx } = this.state
    const { data } = this.props
    const { siteMetadata } = data.site
    const { allSocialJson, allExperienceJson, headshot, santahat, favicon } = data
    const now = new Date()
    const srcSetRegex = /,\n(.*) .*$/g
    let seoImg = null
    if(headshot) {
      seoImg = srcSetRegex.exec(headshot.fixed.srcSet)
      seoImg = seoImg[1]
    }
    
    const ResumePageWrapper = Styled(Flex)`
      overflow-x: hidden;
    `
    const selectStyles = {
      control: (provided) => ({
        ...provided,
        minHeight: '48px',
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
        borderRadius: '0.5em',
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
    const TextBlurb = Styled(Flex)`
      font-size: 1.2em;
      > svg {
        padding-right: 0.5em;
        font-size: 1.5em;
      }
    `
    const WarningBlurb = Styled(TextBlurb)`
      ${MediaMin.l`
        display: none;
      `}
    `
    const SelectWrapper = Styled(Flex)`
      flex: 1 0 auto;
      min-width: 100px;
      max-width: 300px;
    `
    const DownloadButton = Styled(GenericButton)`
      && {
        > button {
          > span {
            display: flex;
            > svg {
              align-self: center;
            }
          }
        }
      }
    `
    const ZoomWrapper = Styled(Flex)`
      font-size: 1.2em;
      ${MediaMin.l`
        display: none;
      `}
    `
    const ZoomValue = Styled(Flex)`
      ::after {
        content: "${Math.round(smallScaleValues[scaleIdx]*100)}%";
        ${MediaMin.s`
          content: "${Math.round(mediumScaleValues[scaleIdx]*100)}%";
        `}
      }
    `
    const ScrollWrapper = Styled.div`
      width: 100vw;
      height: 90vh;
      overflow: scroll;
      ${MediaMin.l`
        width: 100%;
        height: auto;
        padding: 0.25em 0;
        overflow: hidden;
      `}
    `
    const ResumeContainer = Styled(Flex)`
      width: ${PaperWidth.xl}px;
      min-height: ${PaperHeight.xl}px;
      margin-left: auto;
      margin-right: auto;
      ${typeof document !== `undefined` && `
        margin-bottom: ${-1*PaperHeight.xl*(1-document.documentElement.clientWidth*smallScaleValues[scaleIdx]/PaperWidth.xl)}px;
        transform: scale(${document.documentElement.clientWidth*smallScaleValues[scaleIdx]/PaperWidth.xl});
      `}
      transform-origin: 0 0;
      box-shadow: ${MUIBoxShadow};
      ${MediaMin.s`
        ${typeof document !== `undefined` && `
          margin-bottom: ${-1*PaperHeight.xl*(1-document.documentElement.clientWidth*mediumScaleValues[scaleIdx]/PaperWidth.xl)}px;
          transform: scale(${document.documentElement.clientWidth*mediumScaleValues[scaleIdx]/PaperWidth.xl});
        `}
      `}
      ${MediaMin.l`
        margin-bottom: 0;
        transform: scale(1);
      `}
    `
    const ResumeWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 3em;
      line-height: 1.375;
      font-size: 16px;
      color: ${props => props.theme.text};
      background-color: white;
      .body {
        height: ${this.state.multiPaged ? '100%' : 'auto'};
      }
    `
    const Header = Styled.div`
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.75em;
      border-bottom: 0.125em solid rgba(0,0,0,0.1);
    `
    const HeaderLeft = Styled.div`
      flex: 1 1 77%;
      display: flex;
      flex-direction: column;
      padding-right: 1.5em;
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
        margin-bottom: 0.125em;
        font-family: ${FontSans};
        font-size: 64px;
      }
      span {
        font-weight: bold;
        font-size: 20px;
        color: ${props => props.theme.caption};
      }
    `
    const Headshot = Styled.div`
      position: relative;
      .headshot {
        margin: 0.5em 1em 0 0;
        img {
          border-radius: 100%;
        }
      }
      .santa-hat {
        position: absolute;
        top: -2.875em;
        left: -2.5em;
      }
    `
    const HeaderRight = Styled.div`
      flex: 1 1 22%;
      display: flex;
      flex-direction: column;
      padding-left: 1.5em;
      color: ${props => props.theme.text};
    `
    const LinkText = Styled(MetaText)`
      && {
        margin: 0;
        padding: 2px 0;
        font-size: 18px;
        > div:first-child {
          svg, img, div {
            display: inline-block;
            width: 1em;
            height: 1em;
            vertical-align: -2px;
            text-align: center; 
          }
        }
      }
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
    const home = (process.env.GATSBY_CUSTOM_RESUME_FILTERING === 'true') ? <span>
      {canvasLoaded &&
        <LinkText
          type='external'
          icon={[favicon.fluid]}
          texts={['carsonkk.com']}
          links={['//carsonkk.com']}
          iconType='gimg'
        />
      }
    </span> : <span>
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
    // const statusSection = <TextI>
    //   I am currently a {currentJob.title} at {currentJob.company.text} in {currentJob.location}
    // </TextI>

    let extraPages = []
    if(this.state.structuredContent !== null) {
      extraPages = this.state.structuredContent.slice(1)
    }

    return (
      <BaseLayout>
        <SEO
          pathname={this.props.location.pathname}
          title='Resume'
          description="My personal, professional, and educational experiences"
          image={seoImg}
        />
        <ResumePageWrapper flexDirection="column" width={1} pt={5}>
          {!canvasLoaded && <canvas ref='canvas' style={{ display: 'none' }}/>}
          <Flex flexDirection={["column", "column", "column", "column", "row"]} justifyContent={["center", "center", "center", "center", "flex-start"]} width={[1, 1, 1, 1, PaperWidth.xl]} mt={[4]} mx={[0, 0, 0, 0, "auto"]} px={[4, 5, 6, 6, 0]}>
            <WarningBlurb alignItems="center" order={0} pb={[4]}>
              <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} className="fa-fw"/>
              <span>Resume scaling/zooming is limited on mobile. View on a desktop for easier readability.</span>
            </WarningBlurb>
            <TextBlurb alignItems="center" order={[1, 1, 1, 1, 2]} pb={[4]}>
              <FontAwesomeIcon icon={['fas', 'info-circle']} className="fa-fw"/>
              <span>
                Send me an <SmartLink type='external' to='mailto:kyle@carsonkk.com' text='email' title='kyle@carsonkk.com'/> if 
                you need more info such as GPAs, phone number, etc.
              </span>
            </TextBlurb>
            <Flex justifyContent={["center", "center", "center", "center", "flex-start"]} alignItems="flex-end" order={[2, 2, 2, 2, 1]} width={1} pb={[4]}>
              <SelectWrapper pr={[4]}>
                <Select
                  name='resume'
                  options={resumeTypeOptions}
                  onChange={this.handleResumeSelect}
                  value={resumeTypeSelected}
                  isSearchable={false}
                  styles={selectStyles}
                  className="react-select-base"
                />
              </SelectWrapper>
              <DownloadButton
                type='action'
                text='Download'
                icon={['fas', 'download']}
                func={this.handleDownloadPdf}
              />
            </Flex>
            <ZoomWrapper justifyContent="center" alignItems="center" order={3} width={[1]} pb={[4]}>
              <GenericButton
                type='action'
                text=''
                icon={['fas', 'search-minus']}
                func={this.handleScaleDown}
              />
              <ZoomValue px={[5]}/>
              <GenericButton
                type='action'
                text=''
                icon={['fas', 'search-plus']}
                func={this.handleScaleUp}
              />
            </ZoomWrapper>
          </Flex>
          <ScrollWrapper className="resume-scroll">
            <ThemeProvider theme={LightTheme}>
              <Flex flexDirection="column" className='resume-root' ref={(resumeRef) => this.resumeRef = resumeRef}>
                <ResumeContainer className="resume-page">
                  <ResumeWrapper>
                    <Header ref={(headerRef) => this.headerRef = headerRef}>
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
                        {home}
                        {socialLinks[email]}
                        {socialLinks[github]}
                        {socialLinks[linkedin]}
                      </HeaderRight>
                    </Header>
                    {this.state.structuredContent && this.state.structuredContent[0]}
                  </ResumeWrapper>
                </ResumeContainer>
                {extraPages.length !== 0 && extraPages.map((page, i) => {
                  return (
                    <ResumeContainer key={i} className="resume-page" mt={[3, 3, 4, 4, 5]}>
                      <ResumeWrapper>
                        {page}
                      </ResumeWrapper>
                    </ResumeContainer>
                  )
                })}
              </Flex>
            </ThemeProvider>
          </ScrollWrapper>
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
    allCexperienceJson {
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
    allCprojectsJson {
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
            gpa
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
    cskillsJson {
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
    ctechJson {
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
