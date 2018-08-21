import Styled, { css } from 'styled-components'


const MinWidth = {
  s: 576,
  m: 800,
  l: 1024,
  // xl: 1248,
}
const MaxWidth = {
  s: 544,
  m: 768,
  l: 992,
  // xl: 1216,
}
const Media = Object.keys(MinWidth).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${MinWidth[label] / 16}rem) {
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

export const PaddedContainer = Container.extend`
  padding-left: 4rem;
  padding-right: 4rem;
`

export const PostContainer = Container.extend`
  margin-top: 4rem;
  margin-bottom: 4rem;
  padding: 2rem;
`
// ${Media.xl`max-width: ${MaxWidth.xl/16}rem`}