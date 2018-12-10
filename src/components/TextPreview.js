import React from 'react'
import { Link, graphql } from 'gatsby'
import Styled from 'styled-components'

import MetaText from '../components/MetaText'
import { FancyDateMDY } from '../utils/Date'

export default class TextPreview extends React.Component {
  render() {
    // eslint-disable-next-line
    const { frontmatter, fields, id, timeToRead, excerpt } = this.props.data
    const { kind, date, slug, tagSlugs } = fields
    const { title, category, icon, tags, description } = frontmatter
    const TextPreviewWrapper = Styled.div`
      margin-bottom: 1.25rem;
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
          font-size: 1.25em;
        }
      }
    `

    return (
      <TextPreviewWrapper>
        {title && slug &&
          <Title>
            <Link to={`${slug}`}>
              <div></div>
              <h3>{title}</h3>
            </Link>
          </Title>
        }
        {kind && category && icon && 
          <MetaText
            type='text'
            icon={['fas', icon]}
            texts={[`${category} ${kind.charAt(0).toUpperCase()}${kind.slice(1)}`]}
            isInline={true}
          />
        }
        {date &&
          <MetaText
            type='text'
            icon={['far', 'calendar-alt']}
            texts={[FancyDateMDY(Date.parse(date))]}
            isInline={true}
          />
        }
        {timeToRead &&
          <MetaText
            type='text'
            icon={['far', 'clock']}
            texts={[`${timeToRead} min read`]}
            isInline={true}
          />
        }
        {tags && tagSlugs && 
          <MetaText
            type='internal'
            icon={['fas', 'tags']}
            texts={tags}
            links={tagSlugs}
          />
        }
        <div>
          {excerpt && kind === 'article' &&
            <span>{excerpt}</span>
          }
          {description && kind !== 'article' &&
            <span>{description}</span>
          }
        </div>
      </TextPreviewWrapper>
    )
  }
}

export const componentQuery = graphql`
  fragment TextPreviewFragment on MarkdownRemark {
    id
    timeToRead
    excerpt(pruneLength: 140)
    fields {
      kind
      date
      slug
      tagSlugs
    }
    frontmatter {
      title
      category
      icon
      tags
      description
    }
  }
`
