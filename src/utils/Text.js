import Styled from 'styled-components'
import PtSans from 'typeface-pt-sans'
import PtSerif from 'typeface-pt-serif'


export const Text = Styled.span`
  font-style: normal;
  font-weight: normal;
  text-decoration: none;
`

export const TextI = Text.extend`
  font-style: italic;
`

export const TextB = Text.extend`
  font-weight: bold;
`

export const TextU = Text.extend`
  text-decoration: underline;
`

export const TextIB = Text.extend`
  font-style: italic;
  font-weight: bold;
`

export const TextIU = Text.extend`
  font-style: italic;
  text-decoration: underline;
`

export const TextBU = Text.extend`
  font-weight: bold;
  text-decoration: underline;
`

export const TextIBU = Styled.span`
  font-style: italic;
  font-weight: bold;
  text-decoration: underline;
`

export const LinkStyle = `
  a {
    transition: all 0.3s;
    position: relative;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    ::before {
      transition: all 0.3s;
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.125rem;
      visibility: hidden;
      transform: scaleX(0);
    }
    :hover::before {
      visibility: visible;
      transform: scaleX(1);
    }
  }
`

export const FontBase = ` 
  -apple-system, 
  BlinkMacSystemFont, 
  "Segoe UI", 
  Roboto, 
  "Helvetica Neue", 
  Arial, 
  sans-serif, 
  "Apple Color Emoji", 
  "Segoe UI Emoji", 
  "Segoe UI Symbol"
`

export const FontSans = `
  "PT Sans", 
  ${FontBase}
`

export const FontSerif = `
  "PT Serif", 
  ${FontBase}
`