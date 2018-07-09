import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

class ReadOnLink extends React.Component {
  render() {
    return (
      <span>
        <OutboundLink href={this.props.href} target="_blank">
          <FontAwesomeIcon icon="link" fixedWidth/> Read and discuss this post on {this.props.site}
        </OutboundLink>
      </span>
    )
  }
}

export default ReadOnLink