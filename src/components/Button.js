import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { Colors, FontSans } from '../utils/Theme'

class Button extends React.Component {
  render() {
    const iconAndText = (this.props.text.length != 0 && this.props.icon.length != 0)
    const iconLeft = (iconAndText && this.props.isIconLeft)
    const iconRight = (iconAndText && !this.props.isIconLeft)
    let fs
    switch (this.props.size) {
      case 'sm':
        fs = 1
        break;
      case 'md':
        fs = 1.5
        break;
      case 'lg':
        fs = 3
        break;
    }
    const Button = Styled.span`
      display: block;

      a, button {
        transition: all 0.3s;
        display: block;
        margin: 0;
        padding: ${fs/3}rem ${fs/2}rem;
        border: ${this.props.border ? '2px solid white' : 'none'};
        border-radius: ${this.props.radius};
        cursor: pointer;
        font-family: ${FontSans};
        font-size: ${fs}rem;
        line-height: 1;
        color: ${Colors.text};
        background-color: transparent;

        :hover {
          font-weight: bold;
          color: ${Colors.background};
          background-color: ${Colors.text};

          span > svg {
            color: ${Colors.background};
          }
        }
        span > svg {
          transition: all 0.3s;
          font-size: ${(fs*2)/3}rem;
          font-weight: bold;
          vertical-align: 0;
          color: ${Colors.text};
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
        color: ${Colors.background};
        background-color: ${Colors.text};

        span > svg {
          color: ${Colors.background};
        }
      }
      button:focus {
        outline: none;
      }
      ${this.props.css}
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
      <Button>
        {this.props.type == 'internal' &&
          <Link to={this.props.href} activeClassName={`active`}>
            {content}
          </Link>
        }
        {this.props.type == 'external' &&
          <OutboundLink href={this.props.href} title={this.props.title} target="_blank">
            {content}
          </OutboundLink>
        }
        {this.props.type == 'action' &&
          <button onClick={this.props.func} className={this.props.active} type="button">
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
  radius: '0.5rem',
  isIconLeft: true,
  css: '',
  fixedWidth: false,
  active: '',
  size: 'md',
  border: false,
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
  radius: PropTypes.string,
  isIconLeft: PropTypes.bool,
  css: PropTypes.string,
  fixedWidth: PropTypes.bool,
  active: PropTypes.string,
  size: PropTypes.oneOf([
    'sm',
    'md',
    'lg',
  ]),
  border: PropTypes.bool,
}

export default Button
