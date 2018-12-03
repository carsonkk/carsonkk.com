import React from 'react'
import { Link, graphql } from 'gatsby'
import Styled from 'styled-components'

import MetaText from '../components/MetaText'
import { FancyDateMD } from '../utils/Date'

class TextPreview extends React.Component {
  render() {
    const { fields, frontmatter, timeToRead, excerpt } = this.props.post
    const currDate = FancyDateMD(Date.parse(fields.date))

    const TextPreviewWrapper = Styled.div`
      margin-bottom: 3rem;
    `
    const Title = Styled.div`
      line-height: 1;
      a {
        display: inline-flex;
        line-height: 1.5;
        :hover {
          div {
            transform: scaleY(1);
          }
        }
        div {
          transition: transform 0.3s;
          transform-origin: top;
          transform: scaleY(0);
          width: 0.25rem;
          margin-left: -1rem;
          margin-right: 0.75rem;
          background-color: ${props => props.theme.text};
        }
        h3 {
          margin: 0;
        }
      }
    `

    return (
      <TextPreviewWrapper>
        <Title>
          <Link to={`${fields.slug}`}>
              <div></div>
              <h3>{frontmatter.title}</h3>
          </Link>
        </Title>
        <MetaText
          type='text'
          icon={['fas', frontmatter.icon]}
          texts={[frontmatter.tags[0]]}
          isInline={true}
        />
        <MetaText
          type='text'
          icon={['far', 'calendar-alt']}
          texts={[currDate]}
          isInline={true}
        />
        <MetaText
          type='text'
          icon={['far', 'clock']}
          texts={[`${timeToRead} min read`]}
          isInline={true}
        />
        <div>
          <span>{excerpt}</span>
        </div>
      </TextPreviewWrapper>
    )
  }
}

export default TextPreview

export const componentQuery = graphql`
  fragment TextPreviewFragment on MarkdownRemark {
    id
    timeToRead
    excerpt(pruneLength: 140)
    fields {
      date
      slug
    }
    frontmatter {
      title
      icon
      tags
      draft
    }
  }
`
