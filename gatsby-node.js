const _ = require('lodash')
const path = require('path')

let pointers = []

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
                pointer
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
        if(!frontmatter.draft) {
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
                  pointer: fields.pointer,
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
              } else {
                createPage({
                  path: fields.slug,
                  component: path.resolve('src/templates/MiscPost.js'),
                  context: {
                    slug: fields.slug,
                    pointer: fields.pointer,
                  },
                })
              }
              break
          }
        }
      })
      resolve()
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  const contentRgx = /\/content\/(.+?)\//g
  const customRgx = /custom\.md/g
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
          createNodeField({ node, name: 'slug', value: `/projects/${slugTarget}` })
          createNodeField({ node, name: 'kind', value: 'page' })
          createNodeField({ node, name: 'pointer', value: `/${slugTarget}/` })
          pointers = _.union(pointers, [slugTarget])
          break
        case 'misc':
          slugTarget = _.kebabCase(slugTarget)
          createNodeField({ node, name: 'type', value: 'misc' })
          createNodeField({ node, name: 'slug', value: `/misc/${slugTarget}` })
          if(externalRgx.test(filePath)) {
            createNodeField({ node, name: 'kind', value: 'external' })
          } else {
            if(customRgx.test(filePath)) {
              createNodeField({ node, name: 'kind', value: 'custom' })
            } else {
              createNodeField({ node, name: 'kind', value: 'page' })
            }
            createNodeField({ node, name: 'pointer', value: `/${slugTarget}/` })
            pointers = _.union(pointers, [slugTarget])
          }
          break
      }
    }
  } else if(node.internal.type === 'MarkdownRemark' && typeof node.slug === 'undefined') {
    const fileNode = getNode(node.parent)
    createNodeField({ node, name: 'type', value: fileNode.fields.type })
    createNodeField({ node, name: 'kind', value: fileNode.fields.kind })
    if(fileNode.fields.type === 'article') {
      createNodeField({ node, name: 'number', value: parseInt(fileNode.fields.number) })
      
      let articlePointer = _.kebabCase(node.frontmatter.name)
      if(pointers.indexOf(articlePointer) === -1) {
        articlePointer = undefined
      }

      createNodeField({ node, name: 'pointer', value: articlePointer })
    } else if(fileNode.fields.kind !== 'external') {
      createNodeField({ node, name: 'pointer', value: fileNode.fields.pointer })
    }
    createNodeField({ node, name: 'slug', value: fileNode.fields.slug })
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /pixi\.js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
