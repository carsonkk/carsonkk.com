import { css } from 'styled-components'

// Each breakpoint corresponds to:
//    < 608px         portrait phones
//    608px - 800px   landscape phones, larger portrait phones
//    800px - 1024px  portrait tablets, larger landscape phones
//    1024px - 1280px landscape tablets, laptops, smaller monitors
//    1280px - 1568px larger laptops, monitors
//    > 1568px        2K and 4K monitors
// Assumes 16px root/em reference
export const BreakpointsEm = [38,  50,  64,   80,   98]
export const BreakpointsPx = [608, 800, 1024, 1280, 1568]

// Uniform spacing
// Assumes 16px root/em reference
export const SpacingEm = [0, 0.25, 0.5, 1,  2,  4,  8,   16,  32]
export const SpacingPx = [0, 4,    8,   16, 32, 64, 128, 256, 512]

export const ResMinWidthEm = {
  xs: `${BreakpointsEm[0]}em`,
  s:  `${BreakpointsEm[1]}em`,
  m:  `${BreakpointsEm[2]}em`,
  l:  `${BreakpointsEm[3]}em`,
  xl: `${BreakpointsEm[4]}em`
}

export const ResMinWidthPx = {
  xs: BreakpointsPx[0],
  s:  BreakpointsPx[1],
  m:  BreakpointsPx[2],
  l:  BreakpointsPx[3],
  xl: BreakpointsPx[4]
}

export const MediaMin = Object.keys(ResMinWidthPx).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media only screen and (min-width: ${ResMinWidthPx[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})

export const MediaMax = Object.keys(ResMinWidthPx).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media only screen and (max-width: ${ResMinWidthPx[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})

export const PaperWidth = {
  s: 459,   // 0.75x
  m: 612,   // 1x (original, 72ppi x 8.5in)
  l: 918,   // 1.5x
  xl: 1224  // 2x
}
export const PaperHeight = {
  s: 594,   // 0.75x
  m: 792,   // 1x (original, 72ppi x 11in)
  l: 1188,  // 1.5x
  xl: 1584  // 2x
}