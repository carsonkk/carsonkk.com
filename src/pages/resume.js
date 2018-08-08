import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { GutterContainer } from '../components/Container'
import MetaText from '../components/MetaText'
import { FontSans } from '../utils/Theme'

class ResumePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isDarkTheme: false}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme
    }));
  }

  render() {
    const { data } = this.props
    const { siteMetadata } = data.site
    const { allSocialJson, allExperienceJson, allEducationJson, 
      skillJson, techJson, interestJson, me, favicon } = data
    let email, linkedin, github
    const ResumeWrapper = GutterContainer.extend`
      display: flex;
      flex-direction: column;
      box-shadow: 0rem 0rem 1.5rem rgba(0,0,0,0.3);
    `
    const Header = Styled.div`
      display: flex;
      justify-content: space-between;
      padding-bottom: 1.5rem;
      border-bottom: 2px solid ${props => props.theme.caption};
    `
    const HeaderLeft = Styled.div`
      display: flex;
      flex-direction: column;
      > div:last-child {
        margin-top: 0.5rem;
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
        margin: 0;
        font-family: ${FontSans};
        font-size: 3em;
      }
      span {
        font-size: 1.125rem;
        font-weight: bold;
        color: ${props => props.theme.caption};
      }
    `
    const HeaderRight = Styled.div`
      display: flex;
      flex-direction: column;
    `
    const Body = Styled.div`
      display: flex;
      justify-content: flex-end;
      padding-top: 1.5rem;
      h2, h3 {
        font-family: ${FontSans};
      }
    `
    const BodyLeft = Styled.div`
      display: flex;
      flex-direction: column;
      flex-basis: 70%;
      padding-right: 1.5rem;
    `
    const BodyRight = Styled.div`
      display: flex;
      flex-direction: column;
      flex-basis: 30%;
      padding-left: 1.5rem;
      border-left: 2px solid ${props => props.theme.caption};
    `
    const LinkText = Styled(MetaText)`
      && {
        span {
          display: flex;
          font-size: 1.25rem;
          color: ${props => props.theme.text};
          span > a {
            color: ${props => props.theme.text};
          }
        }
      }
    `
    const SideSection = Styled.div`
      display: flex;
      flex-direction: column;
    `
    const SideSubsection = Styled.div`
      display: flex;
      flex-direction: column;
    `
    allSocialJson.edges.forEach(edge => {
      const { node } = edge
      switch(node.name) {
        case 'email':
          email = <LinkText sections={[{
            icon: node.icon,
            texts: [node.url.split(':')[1]],
            links: [node.url],
            type: 'external'
          }]}/>
          break
        case 'linkedin':
          linkedin = <LinkText sections={[{
            icon: node.icon,
            texts: [node.url.split('//')[1]],
            links: [node.url],
            type: 'external'
          }]}/>
          break
        case 'github':
          github = <LinkText sections={[{
            icon: node.icon,
            texts: [node.url.split('//')[1]],
            links: [node.url],
            type: 'external'
          }]}/>
          break
      }
    })
    
    const currentJob = allExperienceJson.edges[0].node
    const experienceSection = <SideSection>
      <h2>EXPERIENCE</h2>
      {allExperienceJson.edges.map((edge, i) => {
        const { node } = edge
        return(
          <SideSubsection key={i}>
            <h3>{node.title}</h3>
            <span>
              <OutboundLink href={node.company.url} target="_blank">
                {node.company.text}
              </OutboundLink>
              <span>, {node.location}</span>
            </span>
            <span>{node.start} - {node.end}</span>
            
            <ul>
              {node.work.map((item, i) => {
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
            <h3>{node.degree}</h3>
            <span>{node.university}</span>
            <span>{node.gpa} GPA</span>
            {node.details.map((detail, i) => {
              return (
                <span key={i}>{detail}</span>
              )
            })}
          </SideSubsection>
        )
      })}
    </SideSection>
    const skillSection = <SideSection>
      <h2>SKILLS</h2>
      <SideSubsection>
        <h3>SOFTWARE</h3>
        {skillJson.software.map((skill, i) => {
          return (
            <span key={i}>{skill}</span>
          )
        })}
      </SideSubsection>
      <SideSubsection>
        <h3>HARDWARE</h3>
        {skillJson.hardware.map((skill, i) => {
          return (
            <span key={i}>{skill}</span>
          )
        })}
      </SideSubsection>
    </SideSection>
    const techSection = <SideSection>
      <h2>TECH</h2>
      <SideSubsection>
        <h3>LANGUAGES</h3>
        {techJson.languages.map((language, i) => {
          return (
            <span key={i}>{language}</span>
          )
        })}
      </SideSubsection>
      <SideSubsection>
        <h3>LIBRARIES</h3>
        {techJson.libraries.map((library, i) => {
          return (
            <span key={i}>{library}</span>
          )
        })}
      </SideSubsection>
      <SideSubsection>
        <h3>SOFTWARE</h3>
        {techJson.tools.map((tool, i) => {
          return (
            <span key={i}>{tool}</span>
          )
        })}
      </SideSubsection>
    </SideSection>
    const interestSection = <SideSection>
      <h2>INTERESTS</h2>
      <SideSubsection>
        {interestJson.buzzwords.map((buzzword, i) => {
          return (
            <span key={i}>{buzzword}</span>
          )
        })}
      </SideSubsection>
    </SideSection>

    return (
      <ResumeWrapper>
        <Header>
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
            <div>
              <span>{currentJob.title}</span>
              <span>{currentJob.company.text}, {currentJob.location}</span>
            </div>
          </HeaderLeft>
          <HeaderRight>
            {email}
            {linkedin}
            {github}
            <LinkText sections={[{
              image: favicon.resolutions,
              texts: [siteMetadata.text],
              links: [siteMetadata.home]
            }]}/>
          </HeaderRight>
        </Header>
        <Body>
          <BodyLeft>
            {experienceSection}
          </BodyLeft>
          <BodyRight>
            {educationSection}
            {skillSection}
            {techSection}
            {interestSection}
          </BodyRight>
        </Body>
      </ResumeWrapper>
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
          start
          end
          work
        }
      }
    }
    allEducationJson {
      edges {
        node {
          university
          degree
          gpa
          details
        }
      }
    }
    skillJson {
      software
      hardware
    }
    techJson {
      languages
      libraries
      tools
    }
    interestJson {
      buzzwords
    }
    me: imageSharp(id: { regex: "/me.png/" }) {
      resolutions(width: 100, height: 100, cropFocus: NORTH) {
        ...GatsbyImageSharpResolutions
      }
    }
    favicon: imageSharp(id: { regex: "/favicon.png/" }) {
      resolutions(width: 32, height: 32) {
        ...GatsbyImageSharpResolutions
      }
    }
  }
`