import React from 'react'
import Img from 'gatsby-image'
import Styled from 'styled-components'
import imagesLoaded from 'imagesloaded'

import crystalize from '../images/crystalize-s.jpg'
import GenericButton from '../components/GenericButton'
import TextPreview from '../components/TextPreview'
import ImagePreviewSection from '../components/ImagePreviewSection'
import { DarkTheme } from '../utils/Theme'
import { PaddedContainer } from '../utils/Container'
import { Slideshow, MoveSlider } from '../utils/Slideshow'

const tickRate = 8000
const slideCount = 3
let slideContents

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    slideContents = this.LaunchShow()
    //setTimeout(function() {
      this.intervalHandle = setInterval(this.tick, tickRate)
    //}, tickRate/2)
    
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandle)
  }

  tick() {
    this.setState(prevState => ({
      index: (prevState.index+1)%slideCount
    }))
    MoveSlider(false, slideContents, this.state.index)
  }

  LaunchShow() {
    imagesLoaded('.image-container', function() {
      var spriteImages = document.querySelectorAll('.slide-image');
      var spriteImagesSrc = [];

      for (var i = 0; i < spriteImages.length; i++) {
        var img = spriteImages[i].getElementsByTagName('img')[1]
        if(img != undefined && img != null) {
          spriteImagesSrc.push(img.getAttribute('src'));
        }
      }

      var initCanvasSlideshow = new Slideshow({
        sprites: spriteImagesSrc,
        displacementImage: crystalize,
        autoPlay: false,
        displaceScale: [300, 300],
        fullScreen: false,
        centerSprites: true,
        wacky: true,
        appendElement : document.querySelector('.image-container'),
        tickRate: tickRate
      });
    });
  }

  render() {
    const { data } = this.props
    const { hiking_1, hiking_2, hiking_3 } = data
    const images = [hiking_1, hiking_2, hiking_3]
    const featuredProjectPostEdges = data.featuredProjectPosts.edges
    const recentArticlePosts = data.recentArticlePosts.edges.map(edge => <TextPreview key={edge.node.id} post={edge.node}/>)
    const featuredArticlePosts = data.featuredArticlePosts.edges.map(edge => <TextPreview key={edge.node.id} post={edge.node}/>)

    const IndexWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
    `
    const IntroSection = Styled.div`
      position: relative;
      color: ${DarkTheme.text};
    `
    const Background = Styled.div`
      height: 100%;
      position: relative;
      > div:first-child {
        position: absolute;
        z-index: 0;
      }
      canvas {
        display: block;
        position: absolute;
      }
    `
    const BackgroundFilter = Styled.div`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.7;
      background-color: black;
    `
    const IntroBlurb = Styled(PaddedContainer)`
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      top: 0;
      bottom: 20%;
      left: 0;
      right: 0;
      overflow: hidden;
      text-align: center;
      h1 {
        font-size: 4rem;
        span {
          color: ${props => props.theme.color};
        }
      }
    `
    const ButtonRow = Styled.div`
      display: flex;
      justify-content: center;
      > span:first-child {
        margin-right: 1.5rem;
      }
      > span:last-child {
        margin-left: 1.5rem;
      }
    `
    const DarkButton = Styled(GenericButton)`
      && {
        a {
          color: ${DarkTheme.text};
          :hover {
            background-color: ${DarkTheme.text};
            svg {
              color: ${props => props.theme.color};
            }
            span > span {
              color: ${DarkTheme.primary};
            }
          }
          svg {
            color: ${DarkTheme.text};
          }
        }
      }
    `
    const ArticleSection = Styled(PaddedContainer)`
      display: flex;
      flex-direction: row;
      padding-top: 2rem;
      padding-bottom: 2rem;
    `
    const ArticleColumn = Styled.div`
      padding-left: 2rem;
      padding-right: 2rem;
    `
    const Divider = Styled.div`
      flex: 1 0 auto;
      width: 0.25rem;
      margin: 2rem;
      background-color: ${props => props.theme.text};
    `
    const ContactSection = Styled(PaddedContainer)`
      padding-top: 2rem;
      text-align: center;
    `
    const ShadowWrapper = Styled.div`
      position: relative;
      z-index: 1;
      box-shadow: 0 0 1rem 0 black;
      background-color: ${props => props.theme.primary};
    `
    
    return (
      <IndexWrapper>
        <IntroSection>
          <Background className="image-container">  
            <div>
              {hiking_1 &&
                <Img sizes={hiking_1.sizes} alt="hiking-1" className="slide-image"/>
              }
              {hiking_2 &&
                <Img sizes={hiking_2.sizes} alt="hiking-2" className="slide-image"/>
              }
              {hiking_3 &&
                <Img sizes={hiking_3.sizes} alt="hiking-3" className="slide-image"/>
              }
            </div>
            {images[(this.state.index+1)%slideCount] &&
              <Img sizes={images[(this.state.index+1)%slideCount].sizes} alt="placeholder"/>
            }
          </Background>
          <BackgroundFilter/>
          <IntroBlurb>
            <h1>Hey, my name's <span>Kyle</span></h1>
            <p>I'm a Software &amp; Computer Engineer from California with a passion for systems.
              This site is meant to consolidate the articles, tutorials, project writeups
              and everything else I've thrown together over the years.
            </p>
            <ButtonRow>
              <DarkButton
                type='internal'
                to='/projects'
                text='My Projects'
                icon={['fas', 'code']}
              />
              <DarkButton
                type='internal'
                to='/resume'
                text='My Resume'
                icon={['fas', 'paper-plane']}
              />
            </ButtonRow>
          </IntroBlurb>
        </IntroSection>
        <ShadowWrapper>
          <ArticleSection>
            <ArticleColumn>
              <h1>Recent Posts</h1>
              {recentArticlePosts}
            </ArticleColumn>
            <Divider/>
            <ArticleColumn>
              <h1>Featured Posts</h1>
              {featuredArticlePosts}
            </ArticleColumn>
          </ArticleSection>
        </ShadowWrapper>
        <ImagePreviewSection posts={featuredProjectPostEdges} data={data}/>
        <ShadowWrapper>
          <ContactSection>
            <h1>Want to get in touch?</h1>
            <p>Shoot an email to kyle@&lt;this website&gt; or check out any of the other links below to find me elsewhere on the web</p>
          </ContactSection>
        </ShadowWrapper>
      </IndexWrapper>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageQuery {
    recentArticlePosts: allMarkdownRemark(
      limit: 3
      filter: {fields: {kind: {eq: "articles"} type: {eq: "page"}} frontmatter: {draft: {ne: true}}}
      sort: {order: DESC, fields: [fields___date]}
    ) {
      edges {
        node {
          ...TextPreviewFragment
        }
      }
    }
    featuredArticlePosts: allMarkdownRemark(
      limit: 3
      filter: {fields: {kind: {eq: "articles"} type: {eq: "page"}} frontmatter: {draft: {ne: true} feature: {eq: true}}}
      sort: {order: DESC, fields: [fields___date]}
    ) {
      edges {
        node {
          ...TextPreviewFragment
        }
      }
    }
    featuredProjectPosts: allMarkdownRemark(
      limit: 6
      filter: {fields: {kind: {eq: "project"} type: {eq: "page"}} frontmatter: {draft: {ne: true} feature: {eq: true}}}
      sort: {order: ASC, fields: [fields___slug]}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            bSingle: banner {
              childImageSharp {
                sizes(maxWidth: 600, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            bDouble: banner {
              childImageSharp {
                sizes(maxWidth: 900, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            bTriple: banner {
              childImageSharp {
                sizes(maxWidth: 1800, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            icon
            name
            description
          }
        }
      }
    }
    ...PlaceholderImageFragment
    hiking_1: imageSharp(id: { regex: "/hiking-1.jpg/" }) {
      sizes(maxWidth: 1920, maxHeight: 1080, cropFocus: NORTH) {
        ...GatsbyImageSharpSizes
      }
    }
    hiking_2: imageSharp(id: { regex: "/hiking-2.jpg/" }) {
      sizes(maxWidth: 1920, maxHeight: 1080) {
        ...GatsbyImageSharpSizes
      }
    }
    hiking_3: imageSharp(id: { regex: "/hiking-3.jpg/" }) {
      sizes(maxWidth: 1920, maxHeight: 1080, cropFocus: SOUTH) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`