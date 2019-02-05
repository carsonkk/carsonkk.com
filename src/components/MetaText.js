import React from 'react'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SmartLink from './SmartLink'


class MetaText extends React.Component {
  render() {
    const { className, type, icon, texts, links, linkStates, iconType, isInline } = this.props

    const MetaText = Styled.div`
      display: ${isInline ? 'inline-flex' : 'flex'};
      padding: 0.25em ${isInline ? '1em' : '0'} 0.25em 0;
      font-size: 0.875em;
      color: ${props => props.theme.caption};
      > div:first-child {
        padding-right: 0.375em;
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
          ::before {
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
      if(type === 'text') {
        return (
          <span key={i}>
            {text}{divider}
          </span>
        )
      }
      else {
        return (
          <span key={i}>
            <MetaLink className={className} type={type} to={links[i]} text={text} linkState={linkStates[i]}/>{divider}
          </span>
        )
      }
    })

    return (
      <MetaText className={className}>
        <div>
          {iconType === 'fa' &&
            <FontAwesomeIcon icon={icon} fixedWidth/>
          }
          {iconType === 'svg' &&
            <object data={icon[0]} type="image/svg+xml">
              <img src="../images/favicon.png" alt="favicon"/>
            </object>
          }
          {iconType === 'img' &&
            <img src={icon[0]} alt=""/>
          }
          {iconType === 'gimg' &&
            <Img fluid={icon[0]} alt=""/>
          }
        </div>
        <div>
          {contents}
        </div>
      </MetaText>
    )
  }
}

MetaText.defaultProps = {
  icon: [],
  links: [],
  linkStates: [],
  iconType: 'fa',
  isInline: false
}

MetaText.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'internal',
    'external'
  ]).isRequired,
  texts: PropTypes.array.isRequired,
  icon: PropTypes.array,
  links: PropTypes.array,
  linkStates: PropTypes.array,
  iconType: PropTypes.oneOf([
    'none',
    'fa',
    'svg',
    'img',
    'gimg'
  ]),
  isInline: PropTypes.bool
}

export default MetaText