import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@rebass/grid'

import ImagePreview from '../components/ImagePreview'

class ImagePreviewCollection extends React.Component {
  render() {
    const { edges } = this.props
    const previews = edges.map((edge, i) => {
      const { banner } = edge.node.frontmatter
      const len = edges.length
      const mod = len%6
      let width = [1/2, 1/3]

      if(i >= len-2) {
        if(i === len-2) {
          switch (mod) {
            case 2:
              width = [1/2, 1/2]
              break;
            case 5:
              width = [1/2, 1/2]
              break;
            default:
              break;
          }
        }
        else if(i === len-1) {
          switch(mod) {
            case 1:
              width = [1, 1]
              break;
            case 2:
              width = [1/2, 1/2]
              break;
            case 3:
              width = [1, 1/3]
              break;
            case 4:
              width = [1/2, 1]
              break;
            case 5:
              width = [1, 1/2]
              break;
            default:
              break;
          }
        }
      }

      return(<ImagePreview key={i} data={edge.node} width={width} image={banner ? banner.childImageSharp.fluid : null}/>)
    })

    return (
      <Flex flexWrap="wrap" width={1}>
        {previews}
      </Flex>
    )
  }
}

ImagePreviewCollection.propTypes = {
  edges: PropTypes.array.isRequired
}

export default ImagePreviewCollection
