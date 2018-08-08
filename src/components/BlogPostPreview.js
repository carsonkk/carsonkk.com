import React from 'react'
import Link from 'gatsby-link'
import Styled from 'styled-components'

import MetaText from '../components/MetaText'
import { FancyDateMD } from '../utils/Helpers'

class BlogPostPreview extends React.Component {
  render() {
    const currDate = Date.parse(this.props.post.fields.date)
    const BlogPostPreviewWrapper = Styled.div`
      margin-bottom: 3rem;
    `
    const Title = Styled.div`
      line-height: 1;

      a {
        display: inline-flex;
        line-height: 1.55;

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
        h2 {
          margin: 0;
        }
      }
    `

    return (
      <BlogPostPreviewWrapper>
        <Title>
          <Link to={`${this.props.post.fields.slug}`}>
              <div></div>
              <h2>{this.props.post.frontmatter.title}</h2>
          </Link>
        </Title>
        <MetaText sections={[
          {
            icon: ['fas', this.props.post.frontmatter.icon],
            texts: [this.props.post.frontmatter.tags[0]]
          },
          {
            icon: ['far', 'calendar-alt'],
            texts: [FancyDateMD(currDate)]
          },
          {
            icon: ['far', 'clock'],
            texts: [`${this.props.post.timeToRead} min read`]
          }
        ]}/>
        <div>
          <span>{this.props.post.excerpt}</span>
        </div>
      </BlogPostPreviewWrapper>
    )
  }
}

export default BlogPostPreview