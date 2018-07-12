import React from 'react'
import Link from 'gatsby-link'
import Styled from 'styled-components'

import MetaText from '../components/MetaText'
import { Colors } from '../utils/Theme'
import { FancyDate } from '../utils/Helpers'

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
          min-width: 0.25rem;
          margin-left: -1rem;
          margin-right: 0.75rem;
          background-color: ${Colors.text};
        }
        h1 {
          margin: 0;
        }
      }
    `

    return (
      <BlogPostPreviewWrapper>
        <Title>
          <Link to={`/blog${this.props.post.fields.slug}`}>
              <div></div>
              <h1>{this.props.post.frontmatter.title}</h1>
          </Link>
        </Title>
        <MetaText sections={[
          {
            icon: ['far', 'calendar-alt'],
            texts: [FancyDate(currDate)]
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