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
  color:     '#2182ff',
  accent:    '#6ecfff',
  text:      '#f4f4f4',
  caption:   '#bbbbbb',
  social:    '#f4f4f4',
  toggle:    '#95a5a6',
}
export const LightTheme = {
  primary:   '#f9f9f9',
  secondary: '#e2e2e2',
  color:     '#2182ff',
  accent:    '#2c5c86',
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
