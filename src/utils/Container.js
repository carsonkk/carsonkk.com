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
  ${Media.s`max-width: ${MaxWidth.s/16}em`}
  ${Media.m`max-width: ${MaxWidth.m/16}em`}
  ${Media.l`max-width: ${MaxWidth.l/16}em`}
`

export const PaddedContainer = Styled(Container)`
  padding: 0em 4em;
`

export const PostContainer = Styled(Container)`
  padding: 4em;
`

export const PaperMinWidth = {
  s: 555,
  m: 708,
  l: 1014,
  xl: 1320
}
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

export const PaperWidthContainer = Styled.div`
  margin: auto;
  width: ${PaperWidth.xl}px;
`

export const PaperHeightContainer = Styled(PaperWidthContainer)`
  display: flex;
  height: ${PaperHeight.xl}px;
`

export const PaperMinHeightContainer = Styled(PaperWidthContainer)`
  display: flex;
  min-height: ${PaperHeight.xl}px;
`
