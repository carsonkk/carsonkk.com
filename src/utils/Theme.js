import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { BreakpointsPx, SpacingPx } from './Responsive'

library.add(
  far,
  fas,
  fab
)
dom.watch()
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
  github:    '#404040',
  breakpoints: BreakpointsPx,
  space: SpacingPx
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
  github:    '#bfbfbf',
  breakpoints: BreakpointsPx,
  space: SpacingPx
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
export const GradientColors = [
  '#D15D66', '#D15D8B', '#A75DD1', '#5D6FD1', '#5D87D1', '#5DBFD1', '#5DD1C3', '#5DD192', '#5DD169', '#8BD15D', '#BED15D', '#D1C65D', '#D1A25D', '#D17D5D',
  '#D41B32', '#D41B56', '#D41B94', '#B21BD4', '#531BD4', '#1B42D4', '#1B96D4', '#1BD4B2', '#1BD461', '#48D41B', '#88D41B', '#D4D41B', '#D4941B', '#D44B1B'
]
export function RandomRange(min, max) {
  return Math.floor(Math.random()*(max-min+1))+min
}
export function RandomAngle() {
  const angles = [1, 20, 40, 60, 80, 100, 120, 140, 160, 
    180, 200, 220, 240, 260, 280, 300, 320, 340
  ]
  return angles[Math.floor(Math.random()*angles.length)]
}
export function AngleToPercents(angle) {
  let percents = [100, 0, 0, 100]
  if((angle >= 225 && angle < 315) || (angle >= 45 && angle < 135)) {
    const base = angle > 180 ? 225 : 45
    const divisor = 90
    percents = [0, 100*(1-(angle-base)/divisor), 100, 100*((angle-base)/divisor)]
  }
  else {
    let base = 0
    let divisor = 0
    if(angle < 45) {
      base = 0
      divisor = 45
    }
    else if(angle >= 315) {
      base = 315
      divisor = 45
    }
    else {
      base = 135
      divisor = 90
    }
    percents = [100*((angle-base)/divisor), 0, 100*(1-(angle-base)/divisor), 100]
  }
  return percents
}

export const VerticalInsetShadow = `::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0em 0.5em 1.25em -0.5em black, inset 0em -0.5em 1.25em -0.5em black;
}`

export const MUIBoxShadow = '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
