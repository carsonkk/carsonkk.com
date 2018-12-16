'use strict';
const _ = require('lodash')
const remark = require('remark')
const sanitizeHTML = require('sanitize-html')
const toHAST = require('mdast-util-to-hast')
const hastToHTML = require('hast-util-to-html')
const visit = require('unist-util-visit')

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    author: 'Kyle Carson',
    about: 'Software & Computer Engineer',
    title: 'kk.',
    description: 'My personal site for articles, project write-ups, and whatever else',
    url: 'http://carsonkk.com',
    text: 'carsonkk.com',
    home: '/'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: -680
            }
          },
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              active: false,
              class: 'emoji-icon',
              size: 64,
              styles: {
                display: 'inline',
                margin: '0',
                marginTop: '1px',
                position: 'relative',
                top: '5px',
                width: '25px'
              }
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 992,
              backgroundColor: 'black',
              linkImagesToOriginal: false
            }
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 992,
              related: false,
              noIframeBorder: true
            }
          },
          'gatsby-remark-external-links',
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: "language-"
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID"
      }
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: "./src/images/favicon.png",
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: true,
          yandex: false,
          windows: true
        }
      }
    },
    {
      resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
      options: {
        fields: [
          'title',
          'topic',
          'tags',
          'description',
          'excerpt'
        ],
        resolvers: {
          MarkdownRemark: {
            type: node => node.fields.type,
            kind: node => node.fields.kind,
            slug: node => node.fields.slug,
            tagSlugs: node => node.fields.tagSlugs,
            created: node => node.frontmatter.created,
            updated: node => node.frontmatter.updated,
            title: node => node.frontmatter.title,
            topic: node => node.frontmatter.topic,
            icon: node => node.frontmatter.icon,
            tags: node => node.frontmatter.tags,
            description: node => node.frontmatter.description,
            draft: node => node.frontmatter.draft,
            excerpt: node => {
              const length = 137
              const tree = remark().parse(node.rawMarkdownBody)
              let excerpt = ''
              visit(tree, 'text', (node) => {
                excerpt += node.value
              })
              return excerpt.slice(0, length) + '...'
            },
            timeToRead: node => {
              const avgWPM = 265
              const tree = remark().parse(node.internal.content)
              const htmlAst = toHAST(tree, { allowDangerousHTML: true })
              const html = hastToHTML(htmlAst, { allowDangerousHTML: true })
              const pureText = sanitizeHTML(html, { allowTags: [] })
              const wordCount = _.words(pureText).length
              let timeToRead = Math.ceil(wordCount / avgWPM)
              if (timeToRead === 0) {
                timeToRead = 1
              }
              return timeToRead
            }
          }
        }
      }
    }
  ]
}
