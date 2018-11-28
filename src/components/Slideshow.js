import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import Styled from 'styled-components'
import imagesLoaded from 'imagesloaded'
import * as PIXI from 'pixi.js'
import {TweenMax, Power1, Power2} from 'gsap/umd/TweenMax'

import crystalize from '../images/crystalize-s.jpg'


class Slideshow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currIndex: 0,
      nextIndex: 1
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
    this.setState(prevState => ({
      currIndex: (prevState.currIndex+1)%this.props.images.length
    }))
    setTimeout(this.tock, this.props.rate/2)
  }

  tock() {
    this.setState(prevState => ({
      nextIndex: (prevState.nextIndex+1)%this.props.images.length
    }))
  }

  render() {
    const { images, subject } = this.props
    const { nextIndex } = this.state

    const SlideshowWrapper = Styled.div`
      height: 100%;
      position: relative;
      > div:first-child {
        position: absolute;
        z-index: 0;
      }
      > div:nth-child(2) {
        
      }
      canvas {
        display: block;
        position: absolute;
      }
    `

    return (
      <SlideshowWrapper className="slideshow-container">  
        <div>
          {images.map((img, i) => {
            return (<Img key={i} sizes={img.sizes} critical={true} fadeIn={false} className="slide-image" alt={`${subject}-${i}`}/>)
          })}
        </div>
        {images[nextIndex] &&
          <Img sizes={images[nextIndex].sizes} alt="placeholder"/>
        }
        {/* canvas will be appended here at render time */}
      </SlideshowWrapper>
    )
  }
}

Slideshow.propTypes = {
  images: PropTypes.array.isRequired,
  rate: PropTypes.number.isRequired,
  subject: PropTypes.string
}

Slideshow.defaultProps = {
  subject: 'slide'
}

export default Slideshow
