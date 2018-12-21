import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import Styled from 'styled-components'

import { LinkStyle } from '../utils/Text'


class SmartLink extends React.Component {
  render() {
    const { className, type, to, text, title, linkState, intRel, extRel } = this.props

    const SmartLinkWrapper = Styled.span`
      ${LinkStyle}
      a {
        transition: all 0.3s;
        color: ${props => props.theme.color};
        :hover {
          color: ${props => props.theme.accent};
        }
        ::before {
          background-color: ${props => props.theme.accent};
        }
      }
    `
    
    return (
      <SmartLinkWrapper className={className}>
        {type === 'internal' &&
          <Link to={to} title={title} activeClassName={`active`} state={linkState} rel={intRel}>
            {text}
          </Link>
        }
        {type === 'external' &&
          <OutboundLink href={to} title={title} target="_blank" rel={extRel}>
            {text}
          </OutboundLink>
        }
      </SmartLinkWrapper>
    )
  }
}

SmartLink.defaultProps = {
  title: '',
  linkState: {},
  intRel: '',
  extRel: 'external nofollow noopener noreferrer'
}

SmartLink.propTypes = {
  type: PropTypes.oneOf([
    'internal',
    'external'
  ]).isRequired,
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string,
  linkState: PropTypes.object,
  intRel: PropTypes.string,
  extRel: PropTypes.string
}

export default SmartLink
