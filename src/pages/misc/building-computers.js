import React from 'react'
import { graphql } from 'gatsby'
import Styled from 'styled-components'
import { Flex } from '@rebass/grid'
import RehypeReact from 'rehype-react'

import BaseLayout from '../../components/BaseLayout'
import SEO from '../../components/SEO'
import { ResMinWidthEm } from '../../utils/Responsive'
import SmartLink from '../../components/SmartLink';

const RenderAst = new RehypeReact({
  createElement: React.createElement,
  components: {},
}).Compiler

class BuildingComputersPage extends React.Component {
  render() {
    const Title = Styled.h1`
      margin-left: auto;
      margin-right: auto;
    `

    return (
      <BaseLayout>
        <SEO
          pathname={this.props.location.pathname}
          title={this.props.data.markdownRemark.frontmatter.title}
          description={this.props.data.markdownRemark.frontmatter.description}
        />
        <Flex flexDirection="column" width={[1, 1, 1, 1, ResMinWidthEm.s]} mx="auto" px={[4, 5, 6, 6, 0]} pt={5}>
          <Title>Building Computers</Title>
          {RenderAst(this.props.data.markdownRemark.htmlAst)}
          <h2>Personal Builds</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Current</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/KHJ9ZR' text='Windows Gaming Rig'/></td>
              </tr>
              <tr>
                <td>Current</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/7ZKPdX' text='Linux Programing Rig'/></td>
              </tr>
              <tr>
                <td>Current</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/2M2RXP' text='FreeNAS NAS/Server Rig'/></td>
              </tr>
              <tr>
                <td>Current</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/9bsQQZ' text='Battlestation Parts'/></td>
              </tr>
            </tbody>
          </table>
          <h2>All Builds</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Description</th>
                <th>Assistance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2018</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/3xgtYT' text='Family/Friends Gaming Build'/></td>
                <td>Parted</td>
              </tr>
              <tr>
                <td>2017</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/w34dTB' text='Family/Friends Gaming Build'/></td>
                <td>Parted</td>
              </tr>
              <tr>
                <td>2017</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/Yf9NHh' text='Family/Friends Gaming Build'/></td>
                <td>Parted</td>
              </tr>
              <tr>
                <td>2017</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/mBPVQZ' text='Family/Friends Gaming Build'/></td>
                <td>Parted & Assembled</td>
              </tr>
              <tr>
                <td>2016</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/gHhtYT' text='Family/Friends Gaming Build'/></td>
                <td>Parted & Helped Assemble</td>
              </tr>
              <tr>
                <td>2016</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/JMf9ZR' text='Family/Friends Gaming Build'/></td>
                <td>Parted</td>
              </tr>
              <tr>
                <td>2016</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/JMf9ZR' text='Family/Friends Gaming Build'/></td>
                <td>Parted</td>
              </tr>
              <tr>
                <td>2016</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/dRXHtg' text='Family/Friends Office Build'/></td>
                <td>Parted & Assembled</td>
              </tr>
              <tr>
                <td>2015</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/rdtJWD' text='Personal NAS/Server Build'/></td>
                <td>Parted & Assembled</td>
              </tr>
              <tr>
                <td>2015</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/hCBZ3b' text='Family/Friends Gaming Build'/></td>
                <td>Parted & Helped Assemble</td>
              </tr>
              <tr>
                <td>2014</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/hBRGzY' text='Family/Friends Internet Build'/></td>
                <td>Parted & Assembled</td>
              </tr>
              <tr>
                <td>2013</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/Bd84QZ' text='Family/Friends Internet Build'/></td>
                <td>Parted & Assembled</td>
              </tr>
              <tr>
                <td>2013</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/PYMctg' text='Family/Friends Gaming Build'/></td>
                <td>Parted & Helped Assemble</td>
              </tr>
              <tr>
                <td>2012</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/CsBPWD' text='Family/Friends Office Build'/></td>
                <td>Parted & Assembled</td>
              </tr>
              <tr>
                <td>2012</td>
                <td><SmartLink type='external' to='https://pcpartpicker.com/list/bCVq8Y' text='Personal College/Gaming Build'/></td>
                <td>Parted & Assembled</td>
              </tr>
            </tbody>
          </table>
        </Flex>
      </BaseLayout>
    )
  }
}

export default BuildingComputersPage

export const pageQuery = graphql`
{
  markdownRemark(fields: {slug: {eq: "/misc/building-computers"}}) {
    htmlAst
    fields {
      slug
    }
    frontmatter {
      banner {
        childImageSharp {
          fluid(maxWidth: 2400, maxHeight: 1200, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      title
      description
    }
  }
}
`
