import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { Colors } from '../utils/Theme'

class ReadOnLink extends React.Component {
  render() {
    return (
      <span>
        <OutboundLink href={this.props.href} target="_blank">
          <FontAwesomeIcon icon="external-link-alt" fixedWidth/> Read and discuss this post on {this.props.site}
        </OutboundLink>
      </span>
    )
  }
}

export default ReadOnLink