import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import SmartLink from './SmartLink'


class MetaText extends React.Component {
  render() {
    const { className, type, icon, texts, links, isInline } = this.props

    const MetaText = Styled.div`
      display: ${isInline ? 'inline-block' : 'block'};
      margin: 0.125rem ${isInline ? '1rem' : '0'} 0.125rem 0;
      font-size: 1rem;
      color: ${props => props.theme.caption};
      svg {
        margin-right: 0.25rem;
      }
    `
    const MetaLink = Styled(SmartLink)`
      && {
        a {
          transition: all 0.3s;
          color: ${props => props.theme.caption};
          :hover {
            color: ${props => props.theme.text};
          }
          :before {
            background-color: ${props => props.theme.text};
          }
        }
      }
    `

    const contents = texts.map((text, i) => {
      let divider = ''
      if(i < texts.length-1) {
        divider = <span>, </span>
      }
      if(type == 'text') {
        return (
          <span key={i}>
            {text}{divider}
          </span>
        )
      }
      else {
        return (
          <span key={i}>
            <MetaLink className={className} type={type} to={links[i]} text={text}/>{divider}
          </span>
        )
      }
    })

    return (
      <MetaText className={className}>
        <FontAwesomeIcon icon={icon} fixedWidth/>
        {contents}
      </MetaText>
    )
  }
}

MetaText.defaultProps = {
  links: [],
  isInline: false
}

MetaText.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'internal',
    'external'
  ]).isRequired,
  icon: PropTypes.array.isRequired,
  texts: PropTypes.array.isRequired,
  links: PropTypes.array,
  isInline: PropTypes.bool
}

export default MetaText
