import React from 'react'
import Link from 'gatsby-link'
import Styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import MetaText from '../components/MetaText'

class BlogPostPreview extends React.Component {
  render() {
    const tagsArray = this.props.post.fields.tagSlugs
    let tags
    const BlogPostPreviewWrapper = Styled.div`
      margin-bottom: 3rem;

      h1 {
        margin-top: 0;
        margin-bottom: 0.25rem;
      }
    `
    
    tags = tagsArray.map((tag, i) => {
      const divider = i < tagsArray.length - 1 && <span>{`, `}</span>
      return (
        <span key={tag}>
          <Link to={tag}>{this.props.post.frontmatter.tags[i]}</Link>
          {divider}
        </span>
      )
    })

    return (
      <BlogPostPreviewWrapper>
        <Link to={`/blog${this.props.post.fields.slug}`}>
            <h1>{this.props.post.frontmatter.title}</h1>
        </Link>
        <MetaText>
          <span><FontAwesomeIcon icon="tags" fixedWidth/> {tags}</span>
        </MetaText>
        <div>
          <span>{this.props.post.excerpt}</span>
        </div>
      </BlogPostPreviewWrapper>
    )
  }
}

export default BlogPostPreview
