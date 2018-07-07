import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { Colors } from '../utils/Theme'
import ajaxGet from '../utils/Ajax'

const typeToPath = {
  forks: 'network',
}
const typeToLabel = {
  stargazers: 'Star',
  watchers: 'Watch',
  forks: 'Fork',
}
const typeToIcon = {
  stargazers: 'star',
  watchers: 'eye',
  forks: 'code-branch'
}

export default class GitHubButton extends React.Component {
  static propTypes = {
    repo: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'stargazers',
      'watchers',
      'forks',
    ]).isRequired,
  }
  state = {
    count: null,
  }

  componentDidMount() {
    this.xhr = ajaxGet(this.getRequestUrl(), (response) => {
      console.log(response)
      this.setCount(response)
    })
  }

  componentWillUnmount() {
    if (this.xhr) {
      this.xhr.abort()
    }
  }

  setCount(data) {
    if (!data) return
    const count = data[`${this.props.type}_count`]
    this.setState({ count })
  }

  getRequestUrl() {
    const { repo } = this.props
    return `//api.github.com/repos/${repo}`
  }

  getCountUrl() {
    const { repo, type } = this.props
    return `//github.com/${repo}/${typeToPath[type] || type}/`
  }

  render() {
    const { type } = this.props
    const count = this.state.count
    const GButton = Styled.button`
      display: block;
      border: none;
      color: ${Colors.text};
      background-color: transparent;
    `

    return (
      <GButton>
        <OutboundLink href={this.getCountUrl()} target="_blank">
          <FontAwesomeIcon icon={`${typeToIcon[type]}`} fixedWidth/> {`${typeToLabel[type]}`} {count}
        </OutboundLink>
      </GButton>
    )
  }
}