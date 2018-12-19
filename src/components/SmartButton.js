import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import Styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class SmartButton extends React.Component {
  render() {
    const { className, type, to, text, title, icon, func, isIconLeft, isFixedWidth, active, intRel, extRel } = this.props
    const iconText = (icon.length !== 0 && text.length !== 0)
    const content = <span>
      {(icon.length !== 0 && isIconLeft) &&
        <FontAwesomeIcon icon={icon} className={isFixedWidth ? 'fa-fw' : ''}/>
      }
      <span data-text={text}>{text}</span>
      {(icon.length !== 0 && !isIconLeft) &&
        <FontAwesomeIcon icon={icon} className={isFixedWidth ? 'fa-fw' : ''}/>
      }
    </span>

    const SmartButtonWrapper = Styled.span`
      display: block;
      a, button {
        cursor: pointer;
        svg {
          padding: 0 ${(iconText && isIconLeft) ? `0.25rem` : `0`} 0 ${(iconText && !isIconLeft) ? `0.25rem` : `0`};
        }
        > span {
          display: inline-block;
        }
        span > span {
          text-align: center;
        }
      }
      button:focus {
        outline: none;
      }
    `

    return (
      <SmartButtonWrapper className={className}>
        {type === 'internal' &&
          <Link to={to} title={title} activeClassName={'active'} rel={intRel}>
            {content}
          </Link>
        }
        {type === 'external' &&
          <OutboundLink href={to} title={title} target="_blank" rel={extRel}>
            {content}
          </OutboundLink>
        }
        {type === 'action' &&
          <button onClick={func} title={title} className={active} type="button">
            {content}
          </button>
        }
      </SmartButtonWrapper>
    )
  }
}

SmartButton.defaultProps = {
  to: '',
  text: '',
  title: '',
  icon: [],
  func: () => { return },
  isIconLeft: true,
  isFixedWidth: false,
  active: '',
  intRel: '',
  extRel: 'external nofollow noopener noreferrer'
}

SmartButton.propTypes = {
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
  active: PropTypes.string,
  intRel: PropTypes.string,
  extRel: PropTypes.string
}

export default SmartButton
