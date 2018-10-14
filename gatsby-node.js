const _ = require(`lodash`)
const path = require(`path`)

let targetTags = []


exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, ) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                date
                slug
                kind
                type
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
        if(fields.type != 'subpage' && !frontmatter.draft) {
          switch (fields.kind) {
            case 'blog':
              createPage({
                path: fields.slug,
                component: path.resolve(`src/templates/BlogPost.js`),
                context: {
                  slug: fields.slug,
                },
              })
              break
            case 'project':
              createPage({
                path: fields.slug,
                component: path.resolve(`src/templates/ProjectPost.js`),
                context: {
                  slug: fields.slug,
                  targetTag: fields.targetTag,
                },
              })
              break
            case 'misc':
              if(fields.type == 'external' ) {
                createPage({
                  path: fields.slug,
                  component: path.resolve(`src/templates/ExternalPost.js`),
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
          component: path.resolve(`src/templates/TaggedPosts.js`),
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
  const contentRgx = /\/content\/(.+?)\//g
  const subpageRgx = /__(?:.+?)__/g
  const externalRgx = /external\.md/g
  if (node.internal.type === `File`) {
    const filePath = node.absolutePath
    let slugTarget = path.parse(filePath).dir.split('/').pop()
    const fileKind = contentRgx.exec(filePath)
    if (fileKind != null) {
      switch (fileKind[1]) {
        case 'blog':
          slugTarget = slugTarget.split(`--`)
          slugTarget[1] = _.kebabCase(slugTarget[1])
          createNodeField({ node, name: `kind`, value: `blog` })
          createNodeField({ node, name: `slug`, value: `/blog/${slugTarget[1]}` })
          createNodeField({ node, name: `type`, value: `page` })
          createNodeField({ node, name: `date`, value: `${slugTarget[0]}` })
          break;
        case 'projects':
          slugTarget = _.kebabCase(slugTarget)
          createNodeField({ node, name: `kind`, value: `project` })
          if(!subpageRgx.test(filePath)) {
            createNodeField({ node, name: `slug`, value: `/projects/${slugTarget}` })
            createNodeField({ node, name: `type`, value: `page` })
            createNodeField({ node, name: `targetTag`, value: `/${slugTarget}/` })
            targetTags.push(`/${slugTarget}/`)
          } else {
            createNodeField({ node, name: `type`, value: `subpage` })
          }
          break
        case 'misc':
          slugTarget = _.kebabCase(slugTarget)
          createNodeField({ node, name: `kind`, value: `misc` })
          createNodeField({ node, name: `slug`, value: `/misc/${slugTarget}` })
          if(!externalRgx.test(filePath)) {
            createNodeField({ node, name: `type`, value: `page` })
            createNodeField({ node, name: `targetTag`, value: `/${slugTarget}/` })
            targetTags.push(`/${slugTarget}/`)
          } else {
            createNodeField({ node, name: `type`, value: `external` })
          }
          break
      }
    }
  } else if(node.internal.type === `MarkdownRemark` && typeof node.slug === `undefined`) {
    const fileNode = getNode(node.parent)
    createNodeField({ node, name: `kind`, value: fileNode.fields.kind })
    createNodeField({ node, name: `type`, value: fileNode.fields.type })
    if(fileNode.fields.type != 'subpage') {
      if(fileNode.fields.kind == 'blog') {
        createNodeField({ node, name: `date`, value: fileNode.fields.date })
        let blogTargetTag = ''
        node.frontmatter.tags.forEach(tag => {
          tag = _.kebabCase(tag)
          if(targetTags.indexOf(`/${tag}/`) != -1 && blogTargetTag == '') {
            blogTargetTag = tag
          }
        })
        createNodeField({ node, name: `targetTag`, value: blogTargetTag })
      } else if(fileNode.fields.type != 'external') {
        createNodeField({ node, name: `targetTag`, value: fileNode.fields.targetTag })
      }
      createNodeField({ node, name: `slug`, value: fileNode.fields.slug })
      if(node.frontmatter.tags) {
        const tagSlugs = node.frontmatter.tags.map(
          tag => `/tags/${_.kebabCase(tag)}/`
        )
        createNodeField({ node, name: `tagSlugs`, value: tagSlugs })
      }
    }
  }
}
