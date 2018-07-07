import React from 'react'
import Styled from 'styled-components'

import { Colors } from '../utils/Theme'

const MetaText = Styled.div`
  a, span, span a {
    transition: all 0.25s;
    font-size: 1rem;
    color: ${Colors.fadedText};
  }

  a:hover {
    transition: all 0.25s;
    text-decoration: underline;
    color: ${Colors.text};
  }

  .meta-inline {
    margin-left: 1rem;
  }
`

export default MetaText