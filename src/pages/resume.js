import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Img from 'gatsby-image'
import Styled, { ThemeProvider } from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { PDFExport } from '@progress/kendo-react-pdf'
import canvg from 'canvg'

import GenericButton from '../components/GenericButton'
import SmartLink from '../components/SmartLink'
import MetaText from '../components/MetaText'
import { LightTheme } from '../utils/Theme'
import { FontSans, TextI } from '../utils/Text'
import { PaperContainer } from '../utils/Container'


class ResumePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
        }
      ]
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => (e) => {
    this.resume.save()
  }

  convertSVGToImage(icons) {
    let canv = this.refs.canvas
    if(!this.state.canvasLoaded) {
      this.setState({canvasLoaded: true})
      canv.getContext('2d')
      icons.forEach((icon) => {
        let htmlString = ReactDOMServer.renderToStaticMarkup(
          <FontAwesomeIcon icon={icon.arr} size={'3x'} style={
            {color: icon.color, height: '128px', width: '128px'}
          }/>
        )
        canvg(canv, htmlString)
        icon.img = canv.toDataURL('image/png')
      })
      this.setState({})
    }
  }

  componentDidMount() {
    this.convertSVGToImage(this.state.icons)
  }

  render() {
    const { data } = this.props
    const { siteMetadata } = data.site
    const { allSocialJson, allExperienceJson, allProjectsJson, allProjectsRemark, 
            allEducationJson, skillsJson, interestsJson, techJson, me, favicon } = data
    const today = new Date()

    // Use 'px' only for proper rendering through PDFExport
    const ResumeWrapper = Styled.div`
      padding: 32px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 24px rgba(0,0,0,0.3);
      font-size: 16px;
      color: ${props => props.theme.text};
      background-color: white;
    `
    const Header = Styled.div`
      display: flex;
      flex-direction: column;
      padding-bottom: 8px;
      border-bottom: 2px solid rgba(0,0,0,0.1);
    `
    const HeaderTop = Styled.div`
      display: flex;
      justify-content: space-between;
    `
    const HeaderLeft = Styled.div`
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-right: 24px;
      > div {
        span {
          display: block;
          line-height: 1.25;
          a {
            transition: all 0.3s;
            :hover {
              text-decoration: underline;
            }
          }
        }
      }
    `
    const NameWrapper = Styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      .gatsby-image-outer-wrapper {
        margin-right: 16px;
        img {
          border-radius: 50%;
        }
      }
      h1 {
        margin-top: 0;
        margin-bottom: 4px;
        font-family: ${FontSans};
        font-size: 72px;
      }
      span {
        font-weight: bold;
        font-size: 20px;
        color: ${props => props.theme.caption};
      }
    `
    const HeaderRight = Styled.div`
      display: flex;
      flex-direction: column;
      margin-left: 24px;
      color: ${props => props.theme.text};
    `
    const LinkText = Styled(MetaText)`
      && {
        img, div {
          display: inline-block;
          width: 1em;
          height: 1em;
          vertical-align: -0.125em;
          font-size: 1em;
          text-align: center; 
        }
      }
    `
    const HeaderBottom = Styled.div`
      display: flex;
      justify-content: center;
      margin-top: 8px;
    `
    const Body = Styled.div`
      display: flex;
      justify-content: flex-end;
      margin-top: 8px;
      h2, h4 {
        position: relative;
        margin-top: 0;
        margin-bottom: 4px;
        font-family: ${FontSans};
      }
      h2 {
        padding-bottom: 4px;
          :before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: ${props => props.theme.color};
        }
      }
      ul {
        margin: 0;
      }
    `
    const BodyLeft = Styled.div`
      flex: 1 1 73%;
      display: flex;
      flex-direction: column;
      padding-right: 24px;
      > div:first-child {
        margin-top: 0;
      }
    `
    const BodyRight = Styled.div`
      flex: 1 1 27%;
      display: flex;
      flex-direction: column;
      padding-left: 24px;
      border-left: 2px solid rgba(0,0,0,0.1);
      > div:first-child {
        margin-top: 0;
      }
    `
    const SideSection = Styled.div`
      display: flex;
      flex-direction: column;
      margin-top: 32px;
    `
    const SideSubsection = Styled.div`
      display: flex;
      flex-direction: column;
      margin-top: 16px;
    `
    const SideSubsectionList = Styled.div`
      margin-top: 16px;
    `

    let email, linkedin, github
    const socialLinks = allSocialJson.edges.map((edge, i) => {
      const { node } = edge
      let linkText = node.url
      let iconImg = []

      if(node.name == 'email') {
        email = i
        linkText = linkText.substring(7)
      }
      else if(node.name == 'linkedin') {
        linkedin = i
        linkText = linkText.substring(12)
      }
      else if(node.name == 'github') {
        github = i
        linkText = linkText.substring(8)
      }
      
      {this.state.canvasLoaded &&
        this.state.icons.forEach((icon) => {
          if(icon.arr[1] == node.icon[1]) {
            iconImg.push(icon.img)
          }
        })
      }

      return (
        <span>
          {this.state.canvasLoaded &&
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
    const home = <LinkText
      type='internal'
      icon={[favicon.sizes]}
      texts={['carsonkk.com']}
      links={['/']}
      iconType='gimg'
    />

    const currentJob = allExperienceJson.edges[0].node
    const statusSection = <TextI>I am currently a {currentJob.title} at {currentJob.company.text} in {currentJob.location}</TextI>

    const experienceSection = <SideSection>
      <h2>EXPERIENCE</h2>
      {allExperienceJson.edges.map((edge, i) => {
        const { node } = edge
        return(
          <SideSubsection key={i}>
            <h4>{node.title}</h4>
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
                  <li key={i}>{item}</li>
                )
              })}
            </ul>
          </SideSubsection>
        )
      })}
    </SideSection>

    const projectsSection = <SideSection>
      <h2>PROJECTS</h2>
      {allProjectsJson.edges.map((edge, i) => {
        const { node } = edge
        let remark
        
        for(let pjct of allProjectsRemark.edges) {
          if(pjct.node.frontmatter.name == node.name) {
            remark = pjct.node
            break
          }
        }
        const { slug } = remark.fields
        const { github, website, description } = remark.frontmatter
        
        return(
          <SideSubsection key={i}>
            <h4>{node.name}</h4>
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
            <TextI>{node.description ? node.description : description}</TextI>
            <ul>
              {node.details.map((item, i) => {
                return(
                  <li key={i}>{item}</li>
                )
              })}
            </ul>
          </SideSubsection>
        )
      })}
    </SideSection>

    const educationSection = <SideSection>
      <h2>EDUCATION</h2>
      {allEducationJson.edges.map((edge, i) => {
        const { node } = edge
        return(
          <SideSubsection key={i}>
            <h4>{node.degree.fullname}</h4>
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
                  <li key={i}>{detail}</li>
                )
              })}
            </ul>
          </SideSubsection>
        )
      })}
    </SideSection>

    const skillsSection = <SideSection>
      <h2>SKILLS</h2>
      <SideSubsection>
        <h4>SOFTWARE</h4>
        {skillsJson.software.map((skill, i) => {
          return (
            <span key={i}>{skill}</span>
          )
        })}
      </SideSubsection>
      <SideSubsection>
        <h4>HARDWARE</h4>
        {skillsJson.hardware.map((skill, i) => {
          return (
            <span key={i}>{skill}</span>
          )
        })}
      </SideSubsection>
    </SideSection>

    const interestsSection = <SideSection>
    <h2>INTERESTS</h2>
    {interestsJson.buzzwords.map((buzzword, i) => {
      return (
        <span key={i}>{buzzword}</span>
      )
    })}
    </SideSection>

    const techSection = <SideSection>
      <h2>TECH</h2>
      <SideSubsectionList>
        <h4>LANGUAGES</h4>
        {techJson.languages.map((language, i) => {
          let divider = ''
          if(i < techJson.languages.length-1) {
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
        <h4>LIBRARIES</h4>
        {techJson.libraries.map((library, i) => {
          let divider = ''
          if(i < techJson.libraries.length-1) {
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
        <h4>SOFTWARE</h4>
        {techJson.softwares.map((software, i) => {
          let divider = ''
          if(i < techJson.softwares.length-1) {
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

    return (
      <div>
        {!this.state.canvasLoaded && <canvas ref="canvas" style={{ display: 'none' }}/>}
        <GenericButton
          type='action'
          text='Download'
          icon={['fas', 'paper-plane']}
          func={this.handleClick()}
        />
        <PDFExport
          author='Kyle Carson'
          creator='Kyle Carson'
          paperSize={'Letter'}
          fileName={`Kyle_Carson_Resume_${today.toLocaleDateString("en-US").replace(/\//g, '-')}.pdf`}
          scale={0.5}
          ref={(r) => this.resume = r}
        >
          <ThemeProvider theme={LightTheme}>
            <PaperContainer>
              <ResumeWrapper>
                <Header>
                  <HeaderTop>
                    <HeaderLeft>
                      <NameWrapper>
                        {me &&
                          <Img resolutions={me.resolutions} alt="Me"/>
                        }
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
                  <BodyRight>
                    {educationSection}
                    {skillsSection}
                    {interestsSection}
                    {techSection}
                  </BodyRight>
                </Body>
              </ResumeWrapper>
            </PaperContainer>
          </ThemeProvider>
        </PDFExport>
      </div>
    )
  }
}

export default ResumePage

export const pageQuery = graphql`
  query ResumeQuery {
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
        }
      }
    }
    allProjectsJson {
      edges {
        node {
          name
          slug
          github
          website
          description
          details
        }
      }
    }
    allProjectsRemark: allMarkdownRemark(
      filter: {fields: {kind: {eq: "project"} type: {eq: "page"}}}
      sort: {order: ASC, fields: [fields___slug]}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            name
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
      hardware
    }
    interestsJson {
      buzzwords
    }
    techJson {
      languages
      libraries
      softwares
    }
    me: imageSharp(id: { regex: "/me.png/" }) {
      resolutions(width: 120, height: 120) {
        ...GatsbyImageSharpResolutions
      }
    }
    favicon: imageSharp(id: { regex: "/favicon.png/" }) {
      sizes(maxWidth: 128, maxHeight: 128) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`