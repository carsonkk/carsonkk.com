import React from 'react'
import Styled from 'styled-components'

import GenericButton from './GenericButton'


class CopyButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  // Warning, here be DOM dragons
  // Assumes the <copy-button/> element comes directly after the ```code block``` in the markdown
  handleClick = () => (e) => {
    // Initialize codeBlock to the previous, previous sibling of its parent's parent
    const btn = e.currentTarget
    let codeBlock = btn.parentNode.parentNode.previousSibling.previousSibling

    // Loop through nodes until the <code> node with the target text is found
    // 8:COMMENT_NODE, 3:TEXT_NODE, need to ignore these
    while(codeBlock.nodeType === 8 || codeBlock.nodeType === 3) {
      codeBlock = codeBlock.nextSibling
    }
    codeBlock = codeBlock.firstChild
    while(codeBlock.nodeType === 8 || codeBlock.nodeType === 3) {
      codeBlock = codeBlock.nextSibling
    }
    codeBlock = codeBlock.firstChild
    while(codeBlock.nodeType === 8 || codeBlock.nodeType === 3) {
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
          z-index: 0;
          right: 0;
          margin: -1em 1em 0 0;
          padding: 0.375em 0.5em;
          border-bottom: 2px solid ${props => props.theme.text};
          border-left: 2px solid ${props => props.theme.text};
          border-right: 2px solid ${props => props.theme.text};
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          font-size: 1em;
          font-weight: bold;
          svg {
            font-size: 0.675em;
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
