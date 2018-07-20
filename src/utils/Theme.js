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
export const DarkTheme = {
  primary:   '#282c34',
  secondary: '#21252b',
  accent:    '#3a4253',
  text:      '#f4f4f4',
  caption:   '#bbbbbb',
  social:    '#f4f4f4',
  toggle:    '#95a5a6',
}
export const LightTheme = {
  primary:   '#f9f9f9',
  secondary: '#e2e2e2',
  accent:    '#f6f6f6',
  text:      '#2a2a2a',
  caption:   '#4f4f4f',
  social:    'transparent',
  toggle:    '#dbb726',
}
export const Colors = {
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
export function RandomColor() {
  const colors = [
    '#d15d66','#e06c75','#d6b16c','#e5c07b',
    '#ece08a','#f7eb95','#89b46a','#98c379',
    '#47a7b3','#56b6c2','#b46ab3','#c379c2',
  ]
  return colors[Math.floor(Math.random()*colors.length)]
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
