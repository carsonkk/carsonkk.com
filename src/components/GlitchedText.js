import React from 'react'
import PropTypes from 'prop-types'
import Styled, { keyframes } from 'styled-components'

import { RandomRange } from '../utils/Theme'


class GlitchedText extends React.Component {
  render() {
    const { children, prologue, epilogue, fontSize, lineHeight, color, background } = this.props

    const tearing = keyframes`
      0% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      5% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      10% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      15% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      20% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      25% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      30% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      35% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      40% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      45% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      50% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      55% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      60% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      65% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      70% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      80% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      85% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      90% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      95% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
      100% {
        clip: rect(${RandomRange(1, fontSize)}px, 1000px, ${RandomRange(1, fontSize)}px, 0);
      }
    `
    const seperating = keyframes`
      0% {
        transform: translate(0);
      }
      3% {
        transform: translate(-${RandomRange(3, 7)}px, ${RandomRange(3, 7)}px);
      }
      6% {
        transform: translate(-${RandomRange(3, 7)}px, -${RandomRange(3, 7)}px);
      }
      9% {
        transform: translate(${RandomRange(3, 7)}px, ${RandomRange(3, 7)}px);
      }
      12% {
        transform: translate(${RandomRange(3, 7)}px, -${RandomRange(3, 7)}px);
      }
      15% {
        transform: translate(0);
      }
      100% {
        transform: translate(0);
      }
    `
    const GlitchedTextWrapper = Styled.span`
      position: relative;
      font-size: ${fontSize}px;
      line-height: ${lineHeight};
      span:nth-child(2) {
        color: ${color};
        background: ${background};
        position: relative;
        span:nth-child(1) {
          position: relative;
          z-index: 10;
        }
        span:nth-child(n+2):nth-child(-n+5) {
          display: block;
          position: absolute;
          top: 0;
        }
        span:nth-child(2), span:nth-child(3) {
          z-index: 9;
          clip: rect(0, 1000px, 0, 0);
        }
        span:nth-child(2) {
          left: -2px;
          color: #f0f;
        }
        span:nth-child(3) {
          left: 2px;
          color: #0f0;
        }
        span:nth-child(4), span:nth-child(5) {
          z-index: 8;
          left: 0;
        }
        span:nth-child(4) {
          color: #0ff;
        }
        span:nth-child(5) {
          color: #ff0;
        }
        :hover {
          span:nth-child(2) {
            animation: ${tearing} 3s infinite linear alternate-reverse;
          }
          span:nth-child(3) {
            animation: ${tearing} 2s infinite linear alternate-reverse;
          }
          span:nth-child(4) {
            animation: ${seperating} 2.75s cubic-bezier(.25, .45, .45, .95) both infinite;
          }
          span:nth-child(5) {
            animation: ${seperating} 2.75s cubic-bezier(.25, .45, .45, .95) reverse both infinite;
          }
        }
      }
    `

    return (
      <GlitchedTextWrapper>
        <span>{prologue}</span>
        <span>
          <span>{children}</span>
          <span>{children}</span>
          <span>{children}</span>
          <span>{children}</span>
          <span>{children}</span>
        </span>
        <span>{epilogue}</span>
      </GlitchedTextWrapper>
    )
  }
}

GlitchedText.propTypes = {
  prologue: PropTypes.string,
  epilogue: PropTypes.string,
  fontSize: PropTypes.number.isRequired,
  lineHeight: PropTypes.number,
  color: PropTypes.string,
  backgroundColor: PropTypes.string
}

GlitchedText.defaultProps = {
  prologue: '',
  epilogue: '',
  lineHeight: 1,
  color: 'white',
  background: 'transparent'
}

export default GlitchedText
