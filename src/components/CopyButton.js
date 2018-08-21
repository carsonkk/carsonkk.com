import React from 'react'
import Styled from 'styled-components'

import GenericButton from './GenericButton'
import { DarkTheme } from '../utils/Theme'


class CopyButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  // Warning, here be DOM dragons
  handleClick = () => (e) => {
    // Initialize codeBlock to the next sibling of its parent in the markdown flow
    const btn = e.currentTarget
    let codeBlock = btn.parentNode.parentNode.nextSibling

    // Loop through nodes until the <code> node with the target text is found
    // 8:COMMENT_NODE, 3:TEXT_NODE, need to ignore these
    while(codeBlock.nodeType == 8 || codeBlock.nodeType == 3) {
      codeBlock = codeBlock.nextSibling
    }
    codeBlock = codeBlock.firstChild
    while(codeBlock.nodeType == 8 || codeBlock.nodeType == 3) {
      codeBlock = codeBlock.nextSibling
    }
    codeBlock = codeBlock.firstChild
    while(codeBlock.nodeType == 8 || codeBlock.nodeType == 3) {
      codeBlock = codeBlock.nextSibling
    }

    // Use an ephemeral <textarea> element to get the code into the clipboard
    let ta = document.createElement('textarea')
    ta.style.height = 0
    btn.appendChild(ta)
    ta.value = codeBlock.innerText
    ta.select()
    document.execCommand('copy')
    btn.removeChild(ta)
  }

  render() {
    const CopyButtonWrapper = Styled(GenericButton)`
      && {
        button {
          position: absolute;
          right: 0;
          margin: 0.5rem 0.5rem 0 0;
          padding: 0.375rem 0.5rem;
          opacity: 0.25;
          font-size: 1rem;
          font-weight: bold;
          color: ${DarkTheme.primary};
          background-color: ${DarkTheme.text};
          :hover {
            opacity: 1;
          }
          svg {
            font-size: 0.675rem;
            color: ${DarkTheme.color};
          }
        }
      }
    `

    return (
      <CopyButtonWrapper
        type='action'
        text='Copy'
        icon={['fas', 'clone']}
        func={this.handleClick()}
      />
    )
  }
}

export default CopyButton
