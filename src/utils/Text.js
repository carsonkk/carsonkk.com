import Styled from 'styled-components'
// eslint-disable-next-line
import PtSans from 'typeface-pt-sans'
// eslint-disable-next-line
import PtSerif from 'typeface-pt-serif'


export const Text = Styled.span`
  font-style: normal;
  font-weight: normal;
  text-decoration: none;
`

export const TextI = Styled(Text)`
  font-style: italic;
`

export const TextB = Styled(Text)`
  font-weight: bold;
`

export const TextU = Styled(Text)`
  text-decoration: underline;
`

export const TextIB = Styled(Text)`
  font-style: italic;
  font-weight: bold;
`

export const TextIU = Styled(Text)`
  font-style: italic;
  text-decoration: underline;
`

export const TextBU = Styled(Text)`
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

export function pluralize(number, word) {
  return number === 1 ? `${number} ${word}` : `${number} ${word}s`
}