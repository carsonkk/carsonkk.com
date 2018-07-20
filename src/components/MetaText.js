import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

class MetaText extends React.Component {
  render() {
    const MetaText = Styled.div`
      span {
        display: flex-inline;
        align-items: center;
        font-size: 1rem;
        color: ${props => props.theme.caption};
        div {
          display: inline-block;
        }
        svg, div {
          align-self: center;
          padding-right: 0.25rem;
        }
        span > a {
          transition: all 0.3s;
          text-decoration: none;
          color: ${props => props.theme.caption};
          :hover {
            text-decoration: underline;
            color: ${props => props.theme.text};
          }
        }
      }
      > span:not(:first-child) {
        padding-left: 1rem;
      }
    `
    const contents = this.props.sections.map(section => {
      let sectionKey = section.icon ? section.icon[1] : ''
      let sectionContent
      if(section.links) {
        sectionContent = section.links.map((link, i) => {
          const divider = i < section.links.length-1 && <span>{`, `}</span>
          let linkWrapper
          sectionKey += section.texts[i]
          if(section.type == 'external') {
            linkWrapper = <OutboundLink href={link} target="_blank">{section.texts[i]}</OutboundLink>
          }
          else {
            linkWrapper = <Link to={link}>{section.texts[i]}</Link>
          }
          return (
            <span key={section.texts[i]}>
              {linkWrapper}
              {divider}
            </span>
          )
        })
      }
      else {
        sectionKey += section.texts[0]
        sectionContent = <span>{section.texts[0]}</span>
      }
      return (
        <span key={sectionKey}>
          {section.icon &&
            <FontAwesomeIcon icon={section.icon} fixedWidth/>
          }
          {section.image &&
            <Img resolutions={section.image} className="svg-inline--fa fa-github fa-w-16 fa-fw "/>
          }
          {sectionContent}
        </span>
      )
    })

    return (
      <MetaText className={this.props.className}>
        {contents}
      </MetaText>
    )
  }
}

MetaText.defaultProps = {
  sections: [],
}

MetaText.propTypes = {
  sections: PropTypes.array,
}

export default MetaText