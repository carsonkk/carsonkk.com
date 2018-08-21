import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

import SmartButton from './SmartButton'
import { FontSans } from '../utils/Text'


class GenericButton extends React.Component {
  render() {
    const { className, type, to, text, title, icon, func, isIconLeft, isFixedWidth, active } = this.props

    const GenericButtonWrapper = Styled(SmartButton)`
      a, button {
        transition: all 0.3s;
        margin: 0;
        padding: 0.5rem 0.75rem;
        border: none;
        border-radius: 0.375rem;
        font-family: ${FontSans};
        font-size: 1.5rem;
        color: ${props => props.theme.text};
        background-color: transparent;
        :hover {
          font-weight: bold;
          background-color: ${props => props.theme.text};
          svg {
            color: ${props => props.theme.color};
          }
          span > span {
            color: ${props => props.theme.primary};
          }
        }
        svg {
          transition: all 0.3s;
          font-size: 1rem;
          vertical-align: 0;
          color: ${props => props.theme.text};
        }
        span > span {
          display: inline-block;
          padding: 0;
          line-height: 1;
          ::before {
            display: block;
            content: attr(data-text);
            font-weight: bold;
            height: 0;
            overflow: hidden;
            visibility: hidden;
          }
        }
      }
      a.active, button.active {
        font-weight: bold;
        background-color: ${props => props.theme.text};
        svg {
          color: ${props => props.theme.color};
        }
        span > span {
          color: ${props => props.theme.primary};
        }
      }
    `

    return (
      <GenericButtonWrapper
        className={className}
        type={type}
        to={to}
        text={text}
        title={title}
        icon={icon}
        func={func}
        isIconLeft={isIconLeft}
        isFixedWidth={isFixedWidth}
        active={active}
      />
    )
  }
}

GenericButton.defaultProps = {
  to: '',
  text: '',
  title: '',
  icon: [],
  func: () => { return },
  isIconLeft: true,
  isFixedWidth: false,
  active: ''
}

GenericButton.propTypes = {
  type: PropTypes.oneOf([
    'internal',
    'external',
    'action',
  ]).isRequired,
  to: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.array,
  func: PropTypes.func,
  isIconLeft: PropTypes.bool,
  isFixedWidth: PropTypes.bool,
  active: PropTypes.string
}

export default GenericButton
