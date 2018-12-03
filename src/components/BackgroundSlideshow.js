import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import Styled from 'styled-components'


class BackgroundSlideshow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bgIndex: 0
    }
    this.tick = this.tick.bind(this)
    this.tock = this.tock.bind(this)
  }

  componentDidMount() {
    this.intervalHandler = setInterval(this.tick, this.props.rate)
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandler)
  }

  tick() {
    setTimeout(this.tock, this.props.rate/2)
  }

  tock() {
    if(this.refs.bg) {
      this.setState(prevState => ({
        bgIndex: (prevState.bgIndex+1)%this.props.images.length
      }))
    }
  }

  render() {
    const { images } = this.props
    const { bgIndex } = this.state

    const BackgroundSlideshow = Styled.div`
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      z-index: 1;
      transform: translate(-51%, -51%) scale(1.02);
    `

    return (
      <BackgroundSlideshow ref="bg">  
        {images[bgIndex] &&
          <Img fluid={images[bgIndex].fluid} alt="background-slide"/>
        }
      </BackgroundSlideshow>
    )
  }
}

BackgroundSlideshow.propTypes = {
  images: PropTypes.array.isRequired,
  rate: PropTypes.number.isRequired
}

export default BackgroundSlideshow
