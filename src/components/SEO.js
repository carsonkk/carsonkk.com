import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, pathname, article }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          author,
          defaultTitle,
          titleTemplate,
          defaultDescription,
          siteUrl,
          defaultImage
        },
      },
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname || ''}`,
      }

      return (
        <>
          <Helmet title={seo.title} titleTemplate={titleTemplate}>
            {seo.url && <link rel="canonical" href={seo.url}/>}
            {seo.url && <meta property="og:url" content={seo.url}/>}
            <meta name="author" content={author}/>
            {seo.title && <meta property="og:title" content={seo.title}/>}
            {seo.description && (<meta name="description" content={seo.description}/>)}
            {seo.description && (<meta property="og:description" content={seo.description}/>)}
            {seo.image && <meta name="image" content={seo.image}/>}
            {seo.image && <meta property="og:image" content={seo.image}/>}
            {(article ? true : null) && (<meta property="og:type" content="article"/>)}
          </Helmet>
        </>
      )
    }}
  />
)

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        author
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl
        defaultImage: image
      }
    }
  }
`