import React from 'react'
import Img from 'gatsby-image'
import Styled from 'styled-components'

import GenericButton from '../components/GenericButton'
import { DarkTheme } from '../utils/Theme'
import { PaddedContainer } from '../utils/Container';


class SearchPage extends React.Component {
  render() {
    const { data } = this.props
    const { hiking_1, hiking_2, hiking_3 } = data

    const IndexWrapper = Styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
    `
    const IntroSection = Styled.div`
      position: relative;
      height: 100%;
    `
    const Background = Styled.div`
      height: 100%;
      > div {
        position: absolute;
        z-index: 0;
      }
      canvas {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
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

    return (
      <IndexWrapper>
        <IntroSection>
          <Background className="image-container">
            <div>
              {hiking_1 &&
                <Img sizes={hiking_1.sizes} alt="hiking-1" className="slide-image" />
              }
              {hiking_2 &&
                <Img sizes={hiking_2.sizes} alt="hiking-2" className="slide-image"/>
              }
              {hiking_3 &&
                <Img sizes={hiking_3.sizes} alt="hiking-3" className="slide-image"/>
              }
            </div>
            {/* <div className="slide-wrapper">
              <div>
                {hiking_1 &&
                  <Img sizes={hiking_1.sizes} alt="hiking-1" className="slide-image"/>
                }
              </div>
              <div>
                {hiking_2 &&
                  <Img sizes={hiking_2.sizes} alt="hiking-2" className="slide-image"/>
                }
              </div>
              <div>
                {hiking_3 &&
                  <Img sizes={hiking_3.sizes} alt="hiking-3" className="slide-image"/>
                }
              </div>				
            </div> */}
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
      </IndexWrapper>
    // <div>
    //   <div>
    //     <div>
    //       <div className="slide-wrapper">
    //         <div>
    //           <img src={hik_1} className="slide-image"/>
    //         </div>
    //         <div>
    //           <img src={hik_2} className="slide-image"/>
    //         </div>
    //         <div>
    //           <img src={hik_3} className="slide-image"/>
    //         </div>				
    //       </div>		
    //     </div>
    //   </div>
    // </div>
    )
  }
}

export default SearchPage

export const pageQuery = graphql`
  query SearchPageQuery {
    hiking_1: imageSharp(id: { regex: "/hiking-1.jpg/" }) {
      sizes(maxWidth: 1500, maxHeight: 750, cropFocus: NORTH) {
        ...GatsbyImageSharpSizes
      }
    }
    hiking_2: imageSharp(id: { regex: "/hiking-2.jpg/" }) {
      sizes(maxWidth: 1500, maxHeight: 750) {
        ...GatsbyImageSharpSizes
      }
    }
    hiking_3: imageSharp(id: { regex: "/hiking-3.jpg/" }) {
      sizes(maxWidth: 1500, maxHeight: 750, cropFocus: SOUTH) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`