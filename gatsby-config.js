'use strict';
const _ = require(`lodash`)
const remark = require('remark')
const sanitizeHTML = require(`sanitize-html`)
const toHAST = require(`mdast-util-to-hast`)
const hastToHTML = require(`hast-util-to-html`)
const visit = require('unist-util-visit')

module.exports = {
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
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`,
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: "language-",
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              backgroundColor: 'black',
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
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
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: [
          'title',
          'name',
          'category',
          'tags',
        ],
        resolvers: {
          MarkdownRemark: {
            kind: node => node.fields.kind,
            slug: node => node.fields.slug,
            tagSlugs: node => node.fields.tagSlugs,
            date: node => node.fields.date,
            title: node => node.frontmatter.title,
            name: node => node.frontmatter.name,
            category: node => node.frontmatter.category,
            icon: node => node.frontmatter.icon,
            tags: node => node.frontmatter.tags,
            description: node => node.frontmatter.description,
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
            },
          }
        }
      }
    },
  ],
}
