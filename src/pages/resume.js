import React from 'react'
import Img from 'gatsby-image'
import Styled, { ThemeProvider } from 'styled-components'
import GenericButton from '../components/GenericButton'
import SmartLink from '../components/SmartLink'
import MetaText from '../components/MetaText'
import { LightTheme } from '../utils/Theme'
import { FontSans, TextI } from '../utils/Text'
import { PostContainer } from '../utils/Container'
import HtmlToPdf from '../utils/Pdf'

const rootId = 'resume-root'

class ResumePage extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => (e) => {
    HtmlToPdf('Resume-KyleCarson.pdf', `#${rootId}`, 1)
  }

  render() {
    const { data } = this.props
    const { siteMetadata } = data.site
    const { allSocialJson, allExperienceJson, allProjectsJson, allProjectsRemark, 
            allEducationJson, skillsJson, interestsJson, techJson, me } = data

    const ResumeWrapper = PostContainer.extend`
      display: flex;
      flex-direction: column;
      
      box-shadow: 0rem 0rem 1.5rem rgba(0,0,0,0.3);
      font-size: 1rem;
      color: ${props => props.theme.text};
      background-color: ${props => props.theme.primary};
    `
    const Header = Styled.div`
      display: flex;
      flex-direction: column;
      padding-bottom: 0.5rem;
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
      margin-right: 1.5rem;
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
        margin-right: 1rem;
        img {
          border-radius: 50%;
        }
      }
      h1 {
        margin-top: 0;
        margin-bottom: 0.25rem;
        font-family: ${FontSans};
        font-size: 4.5rem;
      }
      span {
        font-weight: bold;
        font-size: 1.25rem;
        color: ${props => props.theme.caption};
      }
    `
    const HeaderRight = Styled.div`
      display: flex;
      flex-direction: column;
      margin-left: 1.5rem;
      color: ${props => props.theme.text};
    `
    const HomeLinkText = Styled(MetaText)`
      && {
        svg {
          color: ${props => props.theme.color}; 
        }
      }
    `
    const HeaderBottom = Styled.div`
      display: flex;
      justify-content: center;
      margin-top: 0.5rem;
    `
    const Body = Styled.div`
      display: flex;
      justify-content: flex-end;
      margin-top: 1.5rem;
      h2, h4 {
        position: relative;
        margin-top: 0;
        margin-bottom: 0.25rem;
        font-family: ${FontSans};
      }
      h2 {
        padding-bottom: 0.25rem;
          :before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0.25rem;
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
      padding-right: 1.5rem;
      > div:first-child {
        margin-top: 0;
      }
    `
    const BodyRight = Styled.div`
      flex: 1 1 27%;
      display: flex;
      flex-direction: column;
      padding-left: 1.5rem;
      border-left: 0.125rem solid rgba(0,0,0,0.1);
      > div:first-child {
        margin-top: 0;
      }
    `
    const SideSection = Styled.div`
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
    `
    const SideSubsection = Styled.div`
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
    `
    const SideSubsectionList = Styled.div`
      margin-top: 1rem;
    `

    let email, linkedin, github
    const socialLinks = allSocialJson.edges.map((edge, i) => {
      const { node } = edge
      let linkText = node.url
      
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

      const LinkText = Styled(MetaText)`
        && {
          svg {
            color: ${node.color}; 
          }
        }
      `

      return (
        <LinkText
          type='external'
          icon={node.icon}
          texts={[linkText]}
          links={[node.url]}
        />
      )
    })
    const home = <HomeLinkText
      type='internal'
      icon={['fas', 'tree']}
      texts={['carsonkk.com']}
      links={['/']}
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
        <GenericButton
          type='action'
          text='Download'
          icon={['fas', 'paper-plane']}
          func={this.handleClick()}
        />
        <ThemeProvider theme={LightTheme}>
          <ResumeWrapper id={rootId}>
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
        </ThemeProvider>
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
  }
`