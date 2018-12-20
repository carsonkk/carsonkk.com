import Styled, { css } from 'styled-components'


export const MinWidth = {
  s: 608,
  m: 832,
  l: 1056
}
export const MaxWidth = {
  s: 544,
  m: 768,
  l: 992
}

export const Media = Object.keys(MinWidth).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${MinWidth[label]/16}rem) {
      ${css(...args)}
    }
  `
  return acc
}, {})

export const Container = Styled.div`
  margin-left: auto;
  margin-right: auto;
  ${Media.s`max-width: ${MaxWidth.s/16}rem`}
  ${Media.m`max-width: ${MaxWidth.m/16}rem`}
  ${Media.l`max-width: ${MaxWidth.l/16}rem`}
`

export const PaddedContainer = Styled(Container)`
  padding: 0rem 4rem;
`

export const PostContainer = Styled(Container)`
  padding: 4rem;
`

export const PaperMinWidth = {
  s: 555,
  m: 708,
  l: 1014,
  xl: 1320
}
const PaperWidth = {
  s: 459,   // 0.75x
  m: 612,   // 1x (original, 72ppi x 8.5in)
  l: 918,   // 1.5x
  xl: 1224  // 2x
}
const PaperHeight = {
  s: 594,   // 0.75x
  m: 792,   // 1x (original, 72ppi x 11in)
  l: 1188,  // 1.5x
  xl: 1584  // 2x
}

const PaperMedia = Object.keys(PaperMinWidth).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${PaperMinWidth[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})

export const PaperContainer = Styled.div`
  margin: auto;
  ${PaperMedia.s`width: ${PaperWidth.s}px`}
  ${PaperMedia.m`width: ${PaperWidth.m}px`}
  ${PaperMedia.l`width: ${PaperWidth.l}px`}
  ${PaperMedia.xl`width: ${PaperWidth.xl}px`}
`

export const PaperSizedContainer = Styled(PaperContainer)`
  ${PaperMedia.s`height: ${PaperHeight.s}px`}
  ${PaperMedia.m`height: ${PaperHeight.m}px`}
  ${PaperMedia.l`height: ${PaperHeight.l}px`}
  ${PaperMedia.xl`height: ${PaperHeight.xl}px`}
`
