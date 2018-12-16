const _ = require('lodash')
const path = require('path')

let targetTags = []

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, ) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                type
                kind
                targetTag
              }
              frontmatter {
                tags
                draft
              }
            }
          }
        }
      }
    `
    ).then(result => {
      if(result.errors) {
        console.log(result.errors)
      }
      result.data.allMarkdownRemark.edges.forEach(edge => {
        const { fields, frontmatter } = edge.node
        if(fields.kind !== 'subpage' && !frontmatter.draft) {
          switch (fields.type) {
            case 'article':
              createPage({
                path: fields.slug,
                component: path.resolve('src/templates/ArticlePost.js'),
                context: {
                  slug: fields.slug,
                },
              })
              break
            case 'project':
              createPage({
                path: fields.slug,
                component: path.resolve('src/templates/ProjectPost.js'),
                context: {
                  slug: fields.slug,
                  targetTag: fields.targetTag,
                },
              })
              break
            case 'misc':
              if(fields.kind === 'external') {
                createPage({
                  path: fields.slug,
                  component: path.resolve('src/templates/ExternalPost.js'),
                  context: {
                    slug: fields.slug,
                  },
                })
              }
              break
          }
        }
      })
      let tags = []
      result.data.allMarkdownRemark.edges.forEach(edge => {
        const { frontmatter } = edge.node
        if(frontmatter.tags && !frontmatter.draft) {
          tags = tags.concat(frontmatter.tags)
        }
      })
      tags = _.uniq(tags)
      tags.forEach(tag => {
        const tagPath = `/tags/${_.kebabCase(tag)}`
        createPage({
          path: tagPath,
          component: path.resolve('src/templates/TaggedPosts.js'),
          context: {
            tag,
          },
        })
      })
      resolve()
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  const contentRgx = /\/content\/(.+?)\//g
  const subpageRgx = /__(?:.+?)__/g
  const externalRgx = /external\.md/g
  if (node.internal.type === 'File') {
    const filePath = node.absolutePath
    let slugTarget = path.parse(filePath).dir.split('/').pop()
    const fileType = contentRgx.exec(filePath)
    if (fileType !== null) {
      switch (fileType[1]) {
        case 'articles':
          slugTarget = slugTarget.split('--')
          slugTarget[1] = _.kebabCase(slugTarget[1])
          createNodeField({ node, name: 'type', value: 'article' })
          createNodeField({ node, name: 'slug', value: `/articles/${slugTarget[1]}` })
          createNodeField({ node, name: 'kind', value: 'page' })
          createNodeField({ node, name: 'number', value: parseInt(slugTarget[0]) })
          break
        case 'projects':
          slugTarget = _.kebabCase(slugTarget)
          createNodeField({ node, name: 'type', value: 'project' })
          if(!subpageRgx.test(filePath)) {
            createNodeField({ node, name: 'slug', value: `/projects/${slugTarget}` })
            createNodeField({ node, name: 'kind', value: 'page' })
            createNodeField({ node, name: 'targetTag', value: `/${slugTarget}/` })
            targetTags.push(`/${slugTarget}/`)
          } else {
            createNodeField({ node, name: 'kind', value: 'subpage' })
          }
          break
        case 'misc':
          slugTarget = _.kebabCase(slugTarget)
          createNodeField({ node, name: 'type', value: 'misc' })
          createNodeField({ node, name: 'slug', value: `/misc/${slugTarget}` })
          if(!externalRgx.test(filePath)) {
            createNodeField({ node, name: 'kind', value: 'page' })
            createNodeField({ node, name: 'targetTag', value: `/${slugTarget}/` })
            targetTags.push(`/${slugTarget}/`)
          } else {
            createNodeField({ node, name: 'kind', value: 'external' })
          }
          break
      }
    }
  } else if(node.internal.type === 'MarkdownRemark' && typeof node.slug === 'undefined') {
    const fileNode = getNode(node.parent)
    createNodeField({ node, name: 'type', value: fileNode.fields.type })
    createNodeField({ node, name: 'kind', value: fileNode.fields.kind })
    if(fileNode.fields.kind !== 'subpage') {
      if(fileNode.fields.type === 'article') {
        createNodeField({ node, name: 'number', value: parseInt(fileNode.fields.number) })
        let articlesTargetTag = ''
        node.frontmatter.tags.forEach(tag => {
          tag = _.kebabCase(tag)
          if(targetTags.indexOf(`/${tag}/`) !== -1 && articlesTargetTag === '') {
            articlesTargetTag = tag
          }
        })
        createNodeField({ node, name: 'targetTag', value: articlesTargetTag })
      } else if(fileNode.fields.kind !== 'external') {
        createNodeField({ node, name: 'targetTag', value: fileNode.fields.targetTag })
      }
      createNodeField({ node, name: 'slug', value: fileNode.fields.slug })
      if(node.frontmatter.tags) {
        const tagSlugs = node.frontmatter.tags.map(
          tag => `/tags/${_.kebabCase(tag)}/`
        )
        createNodeField({ node, name: 'tagSlugs', value: tagSlugs })
      }
    }
  }
}
