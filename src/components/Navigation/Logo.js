import React from 'react'
import Link from 'gatsby-link'
import Styled from 'styled-components'

import { FontBase } from '../../utils/Theme'

class Logo extends React.Component {
  render() {
    let Logo
    const LogoBase = Styled.div`
      display: flex;
      flex-direction: column;
      margin: ${this.props.size/(10/3)}rem auto;
      font-family: ${FontBase};
      font-size: ${this.props.size}rem;
      font-style: italic;
      font-weight: bold;
      line-height: 1;

      :hover {
        .top-border, .bottom-border {
          transform: scaleX(1);
        }

        .left-border, .right-border {
          transform: scaleY(1);
        }
      }
      .top-border, .bottom-border, .left-border, .right-border {
        transition: transform 0.4s;
        background-color: ${props => props.theme.text};
      }
      .wrap-border {
        display: flex;

        span {
          padding-left: 0.5rem;
          padding-right: 0.25rem;
        }
      }
      .top-border, .bottom-border {
        transform: scaleX(0);
        width: 100%;
        height: ${this.props.size / 16}rem;
      }
      .left-border, .right-border {
        transform: scaleY(0);
        width: ${this.props.size / 16}rem;
      }
    `
    const today = new Date()
    switch (today.getDay()) {
      case 0:
        Logo = LogoBase.extend`
          .top-border {
            transform-origin: left;
          }
          .bottom-border {
            transform-origin: right;
          }
          .left-border {
            transform-origin: bottom;
          }
          .right-border {
            transform-origin: top;
          }
        `
        break
      case 1:
        Logo = LogoBase.extend`
          :hover {
            .top-border {
              transition-delay: 0s;
            }
            .bottom-border {
              transition-delay: 0.2s;
            }
            .left-border {
              transition-delay: 0.3s;
            }
            .right-border {
              transition-delay: 0.1s;
            }
          }
          .top-border, .bottom-border, .left-border, .right-border {
            transition: transform 0.1s;
          }
          .top-border {
            transform-origin: left;
            transition-delay: 0.3s;
          }
          .bottom-border {
            transform-origin: right;
            transition-delay: 0.1s;
          }
          .left-border {
            transform-origin: bottom;
            transition-delay: 0s;
          }
          .right-border {
            transform-origin: top;
            transition-delay: 0.2s;
          }
        `
        break
      case 2:
        Logo = LogoBase.extend`
          .top-border {
            transform-origin: right;
          }
          .bottom-border {
            transform-origin: left;
          }
          .left-border {
            transform-origin: top;
          }
          .right-border {
            transform-origin: bottom;
          }
        `
        break
      case 3:
        Logo = LogoBase.extend`
        `
        break
      case 4:
        Logo = LogoBase.extend`
          .top-border {
            transform-origin: left;
          }
          .bottom-border {
            transform-origin: right;
          }
          .left-border {
            transform-origin: top;
          }
          .right-border {
            transform-origin: bottom;
          }
        `
        break
      case 5:
        Logo = LogoBase.extend`
          :hover {
            .top-border {
              transition-delay: 0s;
            }
            .bottom-border {
              transition-delay: 0s;
            }
            .left-border {
              transition-delay: 0.2s;
            }
            .right-border {
              transition-delay: 0.2s;
            }
          }
          .top-border, .bottom-border, .left-border, .right-border {
            transition: transform 0.2s;
          }
          .top-border {
            transform-origin: left;
            transition-delay: 0.2s;
          }
          .bottom-border {
            transform-origin: right;
            transition-delay: 0.2s;
          }
          .left-border {
            transform-origin: bottom;
            transition-delay: 0s;
          }
          .right-border {
            transform-origin: top;
            transition-delay: 0s;
          }
        `
        break
      case 6:
        Logo = LogoBase.extend`
          .top-border {
            transform-origin: right;
          }
          .bottom-border {
            transform-origin: left;
          }
          .left-border {
            transform-origin: bottom;
          }
          .right-border {
            transform-origin: top;
          }
        `
        break
    }

    return (
      <Logo>
        <Link to="/">
          <div className='top-border'></div>
          <div className='wrap-border'>
            <div className='left-border'></div>
            <span>kk.</span>
            <div className='right-border'></div>
          </div>
          <div className='bottom-border'></div>
        </Link>
      </Logo>
    )
  }
}

export default Logo
