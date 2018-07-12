import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { Colors } from '../utils/Theme'

class MetaText extends React.Component {
  render() {
    const Section = Styled.span`
      padding-right: 1rem;
      font-size: 1rem;
      color: ${Colors.fadedText};

      svg {
        padding-right: 0.25rem;
      }
      span > a {
        transition: all 0.3s;
        text-decoration: none;
        color: ${Colors.fadedText};

        :hover {
          text-decoration: underline;
          color: ${Colors.text};
        }
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
        <Section key={sectionKey}>
          {section.icon &&
            <FontAwesomeIcon icon={section.icon} fixedWidth/>
          }
          {sectionContent}
        </Section>
      )
    })

    return (
      <div>
        {contents}
      </div>
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