import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import Styled from 'styled-components'
import imagesLoaded from 'imagesloaded'
import * as PIXI from 'pixi.js'
import {TimelineMax, TweenMax, Power1, Power2} from 'gsap/umd/TweenMax'

import crystalize from '../images/crystalize.jpg'

let options
let renderer
let stage
let slidesContainer
let displacementSprite
let displacementFilter

// Initialize global option values
function setOptionsValues(opts) {
  options                     = opts || {}
  options.stageWidth          = opts.hasOwnProperty('stageWidth') ? opts.stageWidth : 1920
  options.stageHeight         = opts.hasOwnProperty('stageHeight') ? opts.stageHeight : 1080
  options.pixiSprites         = opts.hasOwnProperty('sprites') ? opts.sprites : []
  options.centerSprites       = opts.hasOwnProperty('centerSprites') ? opts.centerSprites : false
  options.texts               = opts.hasOwnProperty('texts') ? opts.texts : []
  options.autoPlay            = opts.hasOwnProperty('autoPlay') ? opts.autoPlay : false
  options.autoPlaySpeed       = opts.hasOwnProperty('autoPlaySpeed') ? opts.autoPlaySpeed : [10, 3]
  options.fullScreen          = opts.hasOwnProperty('fullScreen') ? opts.fullScreen : true
  options.displaceScale       = opts.hasOwnProperty('displaceScale') ? opts.displaceScale : [200, 70]
  options.displacementImage   = opts.hasOwnProperty('displacementImage') ? opts.displacementImage : ''
  options.navElement          = opts.hasOwnProperty('navElement')  ?  opts.navElement : document.querySelectorAll('.scene-nav')
  options.displaceAutoFit     = opts.hasOwnProperty('displaceAutoFit')  ?  opts.displaceAutoFit : false;
  options.wacky               = opts.hasOwnProperty('wacky') ? opts.wacky : false
  options.interactive         = opts.hasOwnProperty('interactive') ? opts.interactive : false
  options.interactionEvent    = opts.hasOwnProperty('interactionEvent') ? opts.interactionEvent : ''
  options.displaceScaleTo     = (opts.autoPlay === false) ? [0, 0] : [20, 20]
  options.textColor           = opts.hasOwnProperty('textColor') ? opts.textColor : '#fff'
  options.displacementCenter  = opts.hasOwnProperty('displacementCenter') ? opts.displacementCenter : false
  options.dispatchPointerOver = opts.hasOwnProperty('dispatchPointerOver') ? opts.dispatchPointerOver : false
  options.appendElement       = opts.hasOwnProperty('appendElement') ? opts.appendElement : document.body
}

// Initialize global PIXI values
function setPixiValues() {
  PIXI.utils.skipHello() // forever a jerk face
  renderer           = new PIXI.autoDetectRenderer(options.stageWidth, options.stageHeight, {transparent: true})
  stage              = new PIXI.Container()
  slidesContainer    = new PIXI.Container()
  displacementSprite = new PIXI.Sprite.fromImage(options.displacementImage)
  displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)
}

// Setup the renderer's animation
function renderPixiAnimation() {
  if(options.autoPlay === true) {
    let ticker = new PIXI.ticker.Ticker()
    ticker.autoStart = options.autoPlay
    ticker.add(function(delta) {
      displacementSprite.x += options.autoPlaySpeed[0]*delta
      displacementSprite.y += options.autoPlaySpeed[1]
      renderer.render(stage)
    })
  } else {
    let render = new PIXI.ticker.Ticker()
    render.autoStart = true
    render.add(function(delta) {
      renderer.render(stage)
    })
  }
}

// Initialize the PIXI renderer
function initPixi() {
  // Add canvas to the HTML
  options.appendElement.appendChild(renderer.view)

  // Add child container to the main container
  stage.addChild(slidesContainer)

  // Enable Interactions
  stage.interactive = true

  // Fit renderer to the screen
  if(options.fullScreen === true) {
    renderer.view.style.objectFit       = 'cover'
    renderer.view.style.width           = '100%'
    renderer.view.style.height          = '100%'
    renderer.view.style.top             = '50%'
    renderer.view.style.left            = '50%'
    renderer.view.style.webkitTransform = 'translate(-51%, -51%) scale(1.02)'
    renderer.view.style.transform       = 'translate(-51%, -51%) scale(1.02)'
  } else {
    renderer.view.style.maxWidth        = '100%'
    renderer.view.style.top             = '50%'
    renderer.view.style.left            = '50%'
    renderer.view.style.webkitTransform = 'translate(-50%, -50%)'
    renderer.view.style.transform       = 'translate(-50%, -50%)'
  }
  displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT

  // Set the filter to stage and set some default values for the animation
  stage.filters = [displacementFilter]

  if(options.autoPlay === false) {
    displacementFilter.scale.x = 0
    displacementFilter.scale.y = 0
  }
  if(options.wacky === true) {
    displacementSprite.anchor.set(0.5)
    displacementSprite.x = renderer.width/2
    displacementSprite.y = renderer.height/2
  }
  displacementSprite.scale.x = 2
  displacementSprite.scale.y = 2

  // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
  displacementFilter.autoFit = options.displaceAutoFit
  stage.addChild(displacementSprite)
}

// Load image sprites into container
function loadPixiSprites(sprites) {
  let rSprites = options.sprites

  for(let i = 0; i < rSprites.length; i++) {
    let texture = new PIXI.Texture.fromImage(sprites[i])
    let image   = new PIXI.Sprite(texture)

    if(options.centerSprites === true) {
      image.anchor.set(0.5)
      image.x = renderer.width/2
      image.y = renderer.height/2
    }
    // image.transform.scale.x = 1.3
    // image.transform.scale.y = 1.3
    if(i !== 0) {
      TweenMax.set(image, {alpha: 0})
    }
    slidesContainer.addChild(image)
  }
}

// Transition from the slide at currIndex to the slide at nextIndex
function moveSlider(currIndex, nextIndex) {
  if(slidesContainer.children.length !== 0) {
    let baseTimeline = new TimelineMax({onComplete: function() {
      if(options.wacky === true) {
        displacementSprite.scale.set(1)
      }
    }, onUpdate: function() {
        if ( options.wacky === true ) {
          displacementSprite.rotation += baseTimeline.progress()*0.02
          displacementSprite.scale.set( baseTimeline.progress()*3)
        }
      } 
    })
    baseTimeline.clear()
    if(baseTimeline.isActive()) {
      return
    }
    baseTimeline
    .to(displacementFilter.scale, 1, {x: options.displaceScale[0], y: options.displaceScale[1], ease: Power1.easeOut})
    .to(slidesContainer.children[currIndex], 0.5, {alpha: 0, ease: Power2.easeOut}, 0.2)
    .to(slidesContainer.children[nextIndex], 0.5, {alpha: 1, ease: Power2.easeOut}, 0.3)
    .to(displacementFilter.scale, 1, {x: options.displaceScaleTo[0], y: options.displaceScaleTo[1], ease: Power2.easeOut}, 0.3)
  }
}

class Slideshow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currIndex: 0,
      nextIndex: 1
    }
    this.tick = this.tick.bind(this)
    this.LaunchShow = this.LaunchShow.bind(this)
  }

  componentDidMount() {
    this.LaunchShow()
    this.intervalHandler = setInterval(this.tick, this.props.rate)
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandler)
  }

  tick() {
    moveSlider(this.state.currIndex, this.state.nextIndex)
    // eslint-disable-next-line
    this.state.currIndex = this.state.nextIndex
    // eslint-disable-next-line
    this.state.nextIndex = (this.state.nextIndex+1)%this.props.images.length
  }

  LaunchShow() {
    imagesLoaded('.slideshow-container', function() {
      let spriteImages = document.querySelectorAll('.slide-image')
      let spriteImagesSrc = []
      for(let i = 0; i < spriteImages.length; i++) {
        let img = spriteImages[i].getElementsByTagName('img')[1]
        if(img !== undefined && img !== null) {
          spriteImagesSrc.push(img.getAttribute('src'))
        }
      }
      setOptionsValues({
        sprites: spriteImagesSrc,
        displacementImage: crystalize,
        autoPlay: false,
        displaceScale: [300, 300],
        fullScreen: true,
        centerSprites: true,
        wacky: true,
        appendElement: document.querySelector('.slideshow-container')
      })
      setPixiValues()
      renderPixiAnimation()
      initPixi()
      loadPixiSprites(options.pixiSprites)
    });
  }

  render() {
    const { images, subject } = this.props

    const SlideshowWrapper = Styled.div`
      position: absolute;
      width: 100%;
      height: 100%;
      > div:first-child {
        position: absolute;
        z-index: 0;
        left: 0;
        top: 0;
      }
      > div:nth-child(2) {
        position: relative;
        z-index: 0;
      }
      canvas {
        display: block;
        position: absolute;
        z-index: 2;
      }
    `

    return (
      <SlideshowWrapper className="slideshow-container">  
        <div>
          {images.map((img, i) => {
            return (<Img key={i} fluid={img.fluid} critical={true} fadeIn={false} className="slide-image" alt={`${subject}-${i}`}/>)
          })}
        </div>
        {images[0] &&
          <Img fluid={images[0].fluid} alt="placeholder"/>
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
