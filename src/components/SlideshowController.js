import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import Styled from 'styled-components'
import imagesLoaded from 'imagesloaded'
import * as PIXI from 'pixi.js'
import {TweenMax, Power1, Power2} from 'gsap/umd/TweenMax'

import crystalize from '../images/crystalize-s.jpg'

let options
let renderer
let stage
let slidesContainer
let displacementSprite
let displacementFilter

function setOptionsValues(opts) {
  options                     = opts || {};
  options.stageWidth          = opts.hasOwnProperty('stageWidth') ? opts.stageWidth : 1920;
  options.stageHeight         = opts.hasOwnProperty('stageHeight') ? opts.stageHeight : 1080;
  options.pixiSprites         = opts.hasOwnProperty('sprites') ? opts.sprites : [];
  options.centerSprites       = opts.hasOwnProperty('centerSprites') ? opts.centerSprites : false;
  options.texts               = opts.hasOwnProperty('texts') ? opts.texts : [];
  options.autoPlay            = opts.hasOwnProperty('autoPlay') ? opts.autoPlay : true;
  options.autoPlaySpeed       = opts.hasOwnProperty('autoPlaySpeed') ? opts.autoPlaySpeed : [10, 3];
  options.fullScreen          = opts.hasOwnProperty('fullScreen') ? opts.fullScreen : true;
  options.displaceScale       = opts.hasOwnProperty('displaceScale') ? opts.displaceScale : [200, 70];
  options.displacementImage   = opts.hasOwnProperty('displacementImage') ? opts.displacementImage : '';
  options.navElement          = opts.hasOwnProperty('navElement')  ?  opts.navElement : document.querySelectorAll( '.scene-nav' ); 
  options.displaceAutoFit     = opts.hasOwnProperty('displaceAutoFit')  ?  opts.displaceAutoFit : false; 
  options.wacky               = opts.hasOwnProperty('wacky') ? opts.wacky : false;
  options.interactive         = opts.hasOwnProperty('interactive') ? opts.interactive : false;
  options.interactionEvent    = opts.hasOwnProperty('interactionEvent') ? opts.interactionEvent : '';
  options.displaceScaleTo     = ( opts.autoPlay === false ) ? [ 0, 0 ] : [ 20, 20 ];
  options.textColor           = opts.hasOwnProperty('textColor') ? opts.textColor : '#fff';
  options.displacementCenter  = opts.hasOwnProperty('displacementCenter') ? opts.displacementCenter : false;
  options.dispatchPointerOver = opts.hasOwnProperty('dispatchPointerOver') ? opts.dispatchPointerOver : false;
  options.appendElement       = opts.hasOwnProperty('appendElement') ? opts.appendElement : document.body;
  options.tickRate            = opts.hasOwnProperty('tickRate') ? opts.tickRate : 10000;
}

function setPIXIValues() {
  renderer            = new PIXI.autoDetectRenderer( options.stageWidth, options.stageHeight, { transparent: true });
  stage               = new PIXI.Container();
  slidesContainer     = new PIXI.Container();
  displacementSprite  = new PIXI.Sprite.fromImage( options.displacementImage );
  displacementFilter  = new PIXI.filters.DisplacementFilter( displacementSprite );
}

function initPixi() {

  // Add canvas to the HTML
  options.appendElement.appendChild(renderer.view);


  // Add child container to the main container 
  stage.addChild( slidesContainer );


  // Enable Interactions
  stage.interactive = true;
  

  // Fit renderer to the screen
  if ( options.fullScreen === true ) {
    renderer.view.style.objectFit = 'cover';
    renderer.view.style.width     = '100%';
    renderer.view.style.height    = '100%';
    renderer.view.style.top       = '50%';
    renderer.view.style.left      = '50%';
    renderer.view.style.webkitTransform = 'translate( -50%, -50% ) scale(1.2)';
    renderer.view.style.transform = 'translate( -50%, -50% ) scale(1.2)';           
  } else {
    renderer.view.style.maxWidth  = '100%';
    renderer.view.style.top       = '50%';
    renderer.view.style.left      = '50%';
    renderer.view.style.webkitTransform = 'translate( -50%, -50% )';
    renderer.view.style.transform = 'translate( -50%, -50% )';          
  }
  

  displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;


  // Set the filter to stage and set some default values for the animation
  stage.filters = [displacementFilter];        

  if ( options.autoPlay === false ) {
    displacementFilter.scale.x = 0;
    displacementFilter.scale.y = 0;
  }

  if ( options.wacky === true ) {

    displacementSprite.anchor.set(0.5);
    displacementSprite.x = renderer.width / 2;
    displacementSprite.y = renderer.height / 2; 
  }

  displacementSprite.scale.x = 2;
  displacementSprite.scale.y = 2;

  // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
  displacementFilter.autoFit = options.displaceAutoFit;
  
  stage.addChild( displacementSprite );

};

function loadPixiSprites( sprites ) {
        

  var rSprites = options.sprites;
  //var rTexts   = options.texts;

  for ( var i = 0; i < rSprites.length; i++ ) {
    
    var texture   = new PIXI.Texture.fromImage( sprites[i] );
    var image     = new PIXI.Sprite( texture );

    // if ( rTexts ) {
    //   var richText = new PIXI.Text( rTexts[i], style);
    //   image.addChild(richText);

    //   richText.anchor.set(0.5);
    //   richText.x = image.width / 2;
    //   richText.y = image.height / 2;                     
    // }
    
    if ( options.centerSprites === true ) {
      image.anchor.set(0.5);
      image.x = renderer.width / 2;
      image.y = renderer.height / 2;            
    }
    // image.transform.scale.x = 1.3;
    // image.transform.scale.y = 1.3;
   

    
    if ( i !== 0  ) {
      TweenMax.set( image, { alpha: 0 } );
    }

    slidesContainer.addChild( image );

  } 
  
};

function moveSlider( currIndex, nextIndex ) {

  //isPlaying = true;


  var baseTimeline = new TimelineMax( { onComplete: function () {
    //isPlaying = false;
    if ( options.wacky === true ) {
      displacementSprite.scale.set( 1 );
    }          
   },onUpdate: function() {
    
      if ( options.wacky === true ) {
        displacementSprite.rotation += baseTimeline.progress() * 0.02;      
        displacementSprite.scale.set( baseTimeline.progress() * 3 );
      }

  } });
  
  baseTimeline.clear();
  
  if ( baseTimeline.isActive() ) {
    return;
  }        
  
  // DEMO 4
  baseTimeline
  .to(displacementFilter.scale, 1, { x: options.displaceScale[0], y: options.displaceScale[1], ease: Power1.easeOut  })
  .to(slidesContainer.children[currIndex], 0.5, { alpha: 0, ease: Power2.easeOut }, 0.2)
  .to(slidesContainer.children[nextIndex], 0.5, { alpha: 1, ease: Power2.easeOut }, 0.3)
  .to(displacementFilter.scale, 1, { x: options.displaceScaleTo[0], y: options.displaceScaleTo[1], ease: Power2.easeOut }, 0.3 );

};

class SlideshowController extends React.Component {
  constructor(props) {
    super(props)
    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    const { spriteImagesSrc } = this.props
    console.log(spriteImagesSrc)
    setOptionsValues({
      sprites: spriteImagesSrc,
      displacementImage: crystalize,
      autoPlay: false,
      displaceScale: [300, 300],
      fullScreen: false,
      centerSprites: true,
      wacky: true,
      appendElement : document.querySelector('.slideshow-container')
    })
    setPIXIValues()
    if ( options.autoPlay === true ) {

      var ticker = new PIXI.ticker.Ticker();

      ticker.autoStart = options.autoPlay;

      ticker.add(function( delta ) {
        
        displacementSprite.x += options.autoPlaySpeed[0] * delta;
        displacementSprite.y += options.autoPlaySpeed[1];
        
        renderer.render( stage );

      });

    }  else {

        var render = new PIXI.ticker.Ticker();

        render.autoStart = true;

        render.add(function( delta ) {
          renderer.render( stage );
        });        
      
    }
    initPixi()
    loadPixiSprites(options.pixiSprites)
    this.intervalHandler = setInterval(this.tick, this.props.rate)
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandler)
  }

  tick() {
    moveSlider(this.props.currIndex, this.props.nextIndex)
  }

  render() {
    

    return (
      <div className="slideshow-container">  
        {/* canvas will be appended here at render time */}
      </div>
    )
  }
}

SlideshowController.propTypes = {
  currIndex: PropTypes.number.isRequired,
  nextIndex: PropTypes.number.isRequired,
  spriteImagesSrc: PropTypes.array.isRequired,
  rate: PropTypes.number.isRequired
}

export default SlideshowController
