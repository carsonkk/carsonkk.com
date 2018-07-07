const _ = require(`lodash`)
const path = require(`path`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, ) => {
    const blogPostTemplate = path.resolve(`src/templates/BlogPost.js`)
    const projectPostTemplate = path.resolve(`src/templates/ProjectPost.js`)
    const taggedPostsTemplate = path.resolve(`src/templates/TaggedPosts.js`)
    graphql(
      `
        {
          allMarkdownRemark(
            limit: 1000
          ) {
            edges {
              node {
                fields {
                  date
                  slug
                  kind
                }
                frontmatter {
                  tags
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
        if(edge.node.fields.kind == `blog`) {
          createPage({
            path: `/blog${edge.node.fields.slug}`,
            component: blogPostTemplate,
            context: {
              date: edge.node.fields.date,
              slug: edge.node.fields.slug,
              kind: edge.node.fields.kind,
            },
          })
        } else if(edge.node.fields.kind == `project`) {
          createPage({
            path: `/projects${edge.node.fields.slug}`,
            component: projectPostTemplate,
            context: {
              slug: edge.node.fields.slug,
              kind: edge.node.fields.kind,
            },
          })
        }
      })

      let tags = []
      result.data.allMarkdownRemark.edges.forEach(edge => {
        if(_.get(edge, `node.frontmatter.tags`)) {
          tags = tags.concat(edge.node.frontmatter.tags)
        }
      })
      tags = _.uniq(tags)
      tags.forEach(tag => {
        const tagPath = `/tags/${_.kebabCase(tag)}`
        createPage({
          path: tagPath,
          component: taggedPostsTemplate,
          context: {
            tag,
          },
        })
      })
      resolve()
    })
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `File`) {
    const parsedFilePath = path.parse(node.absolutePath).dir.split(`--`)
    if(parsedFilePath.length > 1) {
      const date = `${parsedFilePath[0].split(`/`).pop()}`
      const slug = `/${parsedFilePath[1]}/`
      createNodeField({ node, name: `date`, value: date })
      createNodeField({ node, name: `slug`, value: slug })
      createNodeField({ node, name: `kind`, value: `blog` })
    } else {
      const slug = `/${path.parse(node.absolutePath).dir.split(`/`).pop()}/`
      createNodeField({ node, name: `slug`, value: slug })
      createNodeField({ node, name: `kind`, value: `project` })
    }
  } else if (node.internal.type === `MarkdownRemark` && typeof node.slug === `undefined`) {
    const fileNode = getNode(node.parent)
    if(fileNode.fields.date) {
      createNodeField({ node, name: `date`, value: fileNode.fields.date })
    }
    createNodeField({ node, name: `slug`, value: fileNode.fields.slug })
    createNodeField({ node, name: `kind`, value: fileNode.fields.kind })
    if(node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => `/tags/${_.kebabCase(tag)}`
      )
      createNodeField({ node, name: `tagSlugs`, value: tagSlugs })
    }
  }
}
