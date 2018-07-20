import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { FontSans } from '../utils/Theme'

class Button extends React.Component {
  render() {
    const iconAndText = (this.props.text.length != 0 && this.props.icon.length != 0)
    const iconLeft = (iconAndText && this.props.isIconLeft)
    const iconRight = (iconAndText && !this.props.isIconLeft)
    const Button = Styled.span`
      display: block;
      a, button {
        transition: all 0.3s;
        display: block;
        margin: 0;
        padding: 0.5rem 0.75rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-family: ${FontSans};
        font-size: 1.5rem;
        line-height: 1;
        color: ${props => props.theme.text};
        background-color: transparent;
        :hover {
          font-weight: bold;
          color: ${props => props.theme.primary};
          background-color: ${props => props.theme.text};
          span > svg {
            color: ${props => props.theme.primary};
          }
        }
        span > svg {
          transition: all 0.3s;
          font-size: 1rem;
          font-weight: bold;
          vertical-align: 0;
          color: ${props => props.theme.text};
        }
        span > span {
          display: inline-block;
          padding: 0 ${iconRight ? `0.25rem` : `0`} 0 ${iconLeft ? `0.25rem` : `0`};
          line-height: 1;
          text-align: center;
          ::before {
            display: block;
            content: attr(data-title);
            font-weight: bold;
            height: 0;
            overflow: hidden;
            visibility: hidden;
          }
        }
      }
      a.active, button.active {
        font-weight: bold;
        color: ${props => props.theme.primary};
        background-color: ${props => props.theme.text};
        span, span > svg {
          color: ${props => props.theme.primary};
        }
      }
      button:focus {
        outline: none;
      }
    `
    const content = <span>
      {(this.props.icon.length != 0 && this.props.isIconLeft) &&
        <FontAwesomeIcon icon={this.props.icon} className={this.props.fixedWidth ? `fa-fw` : ``}/>
      }
      {this.props.text.length != 0 &&
        <span data-title={this.props.text}>{this.props.text}</span>
      }
      {(this.props.icon.length != 0 && !this.props.isIconLeft) &&
        <FontAwesomeIcon icon={this.props.icon} className={this.props.fixedWidth ? `fa-fw` : ``}/>
      }
    </span>

    return (
      <Button className={this.props.className}>
        {this.props.type == 'internal' &&
          <Link to={this.props.href} title={this.props.title} activeClassName={`active`}>
            {content}
          </Link>
        }
        {this.props.type == 'external' &&
          <OutboundLink href={this.props.href} title={this.props.title} target="_blank">
            {content}
          </OutboundLink>
        }
        {this.props.type == 'action' &&
          <button onClick={this.props.func} title={this.props.title} className={this.props.active} type="button">
            {content}
          </button>
        }
      </Button>
    )
  }
}

Button.defaultProps = {
  href: '',
  title: '',
  icon: [],
  text: '',
  func: () => {return},
  isIconLeft: true,
  fixedWidth: false,
  active: '',
}

Button.propTypes = {
  type: PropTypes.oneOf([
    'internal',
    'external',
    'action',
  ]).isRequired,
  href: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.array,
  text: PropTypes.string,
  func: PropTypes.func,
  isIconLeft: PropTypes.bool,
  fixedWidth: PropTypes.bool,
  active: PropTypes.string,
}

export default Button
