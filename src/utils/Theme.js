import { css } from 'styled-components'
import PtSans from 'typeface-pt-sans'
import PtSerif from 'typeface-pt-serif'
import fontawesome from '@fortawesome/fontawesome'
import regular from '@fortawesome/fontawesome-free-regular'
import solid from '@fortawesome/fontawesome-free-solid'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(
  regular,
  solid,
  brands,
)

export function RandomIcon() {
  const icons = [
    ['fas', 'anchor'],
    ['fas', 'battery-quarter'],
    ['fas', 'beer'],
    ['fas', 'bicycle'],
    ['fas', 'birthday-cake'],
    ['fas', 'bolt'],
    ['fas', 'bomb'],
    ['fas', 'bowling-ball'],
    ['fas', 'bug'],
    ['fas', 'burn'],
    ['fas', 'camera'],
    ['fas', 'chart-line'],
    ['fas', 'chess'],
    ['fas', 'couch'],
    ['fas', 'database'],
    ['fas', 'dice'],
    ['fas', 'gamepad'],
    ['fas', 'golf-ball'],
    ['fas', 'headphones'],
    ['fas', 'keyboard'],
    ['fab', 'linux'],
    ['fas', 'magic'],
    ['fas', 'microchip'],
    ['fas', 'paint-brush'],
    ['fas', 'rocket'],
    ['fas', 'terminal'],
    ['fas', 'thumbs-up'],
    ['fas', 'volleyball-ball'],
  ]
  return icons[Math.floor(Math.random()*icons.length)]
}

export const Colors = {
  background: '#282c34',
  backgroundAccent: '#495162',
  foreground: '#21252b',
  foregroundAccent: '#3a4253',
  lightest: '#e2e6ea',
  lighter: '#dae0e5',
  light: '#d3d9df',
  text: '#f4f4f4',
  fadedText: '#bbbbbb',
  oneRed: '#d15d66',
  oneRedAccent: '#e06c75',
  oneOrange: '#d6b16c',
  oneOrangeAccent: '#e5c07b',
  oneYellow: '#ece08a',
  oneYellowAccent: '#f7eb95',
  oneGreen: '#89b46a',
  oneGreenAccent: '#98c379',
  oneBlue: '#47a7b3',
  oneBlueAccent: '#56b6c2',
  onePurple: '#b46ab3',
  onePurpleAccent: '#c379c2',
}

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

const MinWidth = {
  s: 576,
  m: 800,
  l: 1024,
  xl: 1248,
}
export const MaxWidth = {
  s: 544,
  m: 768,
  l: 992,
  xl: 1216,
}
export const Media = Object.keys(MinWidth).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${MinWidth[label] / 16}rem) {
      ${css(...args)}
    }
  `
  return acc
}, {})
