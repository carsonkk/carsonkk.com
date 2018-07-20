import Styled from 'styled-components'

import { Media, MaxWidth } from '../utils/Theme'

export const Container = Styled.div`
  margin-left: auto;
  margin-right: auto;
  ${Media.s`max-width: ${MaxWidth.s / 16}rem`}
  ${Media.m`max-width: ${MaxWidth.m / 16}rem`}
  ${Media.l`max-width: ${MaxWidth.l / 16}rem`}
  ${Media.xl`max-width: ${MaxWidth.xl / 16}rem`}
`

export const GutterContainer = Container.extend`
  margin-top: 4rem;
  margin-bottom: 4rem;
  padding: 1.5rem;
  ${Media.xl`max-width: 50rem`}
`

export const ContentContainer = Container.extend`
  padding: 1rem;
`
