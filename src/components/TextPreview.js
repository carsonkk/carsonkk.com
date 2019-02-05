import React from 'react'
import { Link, graphql } from 'gatsby'
import _ from 'lodash'
import Styled from 'styled-components'

import MetaText from '../components/MetaText'
import { FancyDateMDY } from '../utils/Date'

class TextPreview extends React.Component {
  render() {
    // eslint-disable-next-line
    const { frontmatter, fields, id, timeToRead, excerpt } = this.props.data
    const { type, slug } = fields
    const { created, title, topic, icon, tags, description } = frontmatter
    
    const TextPreviewWrapper = Styled.div`
      margin-bottom: 2em;
    `
    const Title = Styled.div`
      line-height: 1;
      a {
        display: inline-flex;
        line-height: 1.5;
        :hover {
          div {
            transform: scaleY(0.9);
          }
        }
        div {
          transition: transform 0.3s;
          transform-origin: top;
          transform: scaleY(0);
          width: 0.25rem;
          margin-left: -1em;
          margin-right: 0.75em;
          background-color: ${props => props.theme.text};
        }
      }
      h4 {
        margin-bottom: 0.125em;
      }
    `
    const PreviewDescription = Styled.div`
      margin-top: 0.375em;
    `

    return (
      <TextPreviewWrapper key={id}>
        {title && slug &&
          <Title>
            <Link to={`${slug}`}>
              <div></div>
              <h4>{title}</h4>
            </Link>
          </Title>
        }
        {type && topic && icon && 
          <MetaText
            type='text'
            icon={['fas', icon]}
            texts={[`${topic} ${_.capitalize(type)}`]}
            isInline={true}
          />
        }
        {created &&
          <MetaText
            type='text'
            icon={['far', 'calendar-alt']}
            texts={[FancyDateMDY(Date.parse(created))]}
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
        {tags && 
          <MetaText
            type='internal'
            icon={['fas', 'tags']}
            texts={tags}
            links={Array(tags.length).fill('/search')}
            linkStates={tags.map(tag => ({tag: tag}))}
          />
        }
        <PreviewDescription>
          {excerpt && type === 'article' &&
            <span>{excerpt}</span>
          }
          {description && type !== 'article' &&
            <span>{description}</span>
          }
        </PreviewDescription>
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
      type
      slug
    }
    frontmatter {
      created
      title
      topic
      icon
      tags
      description
    }
  }
`
