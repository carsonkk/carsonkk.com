import React from 'react'
import Styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

class SocialLink extends React.Component {
  render() {
    const SocialWrapper = Styled.span`
      a {
        transition: all 0.3s;
        display: block;
        margin: 0 0.5rem;
        padding: 0.25rem 0.25rem;
        border-radius: 0.375rem;
        line-height: 0;
        
        :hover {
          color: ${this.props.color};
          background-color: ${props => props.theme.text};
        }

        svg {
          height: 1.25em;
        }
      }
    `

    return (
      <SocialWrapper>
        <OutboundLink href={this.props.href} title={this.props.title} target="_blank">
          <FontAwesomeIcon icon={this.props.icon} fixedWidth/>
        </OutboundLink>
      </SocialWrapper>
    )
  }
}

export default SocialLink