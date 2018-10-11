import Styled, { css } from 'styled-components'


const MinWidth = {
  s: 576,
  m: 800,
  l: 1024,
  // xl: 1248
}
const MaxWidth = {
  s: 544,
  m: 768,
  l: 992,
  // xl: 1216
}

const Media = Object.keys(MinWidth).reduce((acc, label) => {
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
//  ${Media.xl`max-width: ${MaxWidth.xl/16}rem`}
export const PaddedContainer = Container.extend`
  padding-left: 4rem;
  padding-right: 4rem;
`

export const PostContainer = Container.extend`
  padding: 4rem 2rem;
`

export const PaperMinWidth = {
  s: 491,
  m: 644,
  l: 950,
  xl: 1256
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
  overflow: hidden;
  ${PaperMedia.s`width: ${PaperWidth.s}px`}
  ${PaperMedia.m`width: ${PaperWidth.m}px`}
  ${PaperMedia.l`width: ${PaperWidth.l}px`}
  ${PaperMedia.xl`width: ${PaperWidth.xl}px`}
`

export const PaperSizedContainer = PaperContainer.extend`
  ${PaperMedia.s`height: ${PaperHeight.s}px`}
  ${PaperMedia.m`height: ${PaperHeight.m}px`}
  ${PaperMedia.l`height: ${PaperHeight.l}px`}
  ${PaperMedia.xl`height: ${PaperHeight.xl}px`}
`
