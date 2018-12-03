// import React from "react"
// import { graphql, Link } from 'gatsby'

// class TaggedPosts extends React.Component {
//   render() {
//     const posts = this.props.data.allMarkdownRemark.edges
//     const postLinks = posts.map(post => (
//       <li key={post.node.fields.slug}>
//         <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
//       </li>
//     ))

//     return (
//       <div>
//         <h1>
//           {this.props.data.allMarkdownRemark.totalCount}
//           {` `}posts tagged with “{this.props.pageContext.tag}”
//         </h1>
//         <ul>{postLinks}</ul>
//         <p>
//           <Link to="/tags/">Browse all tags</Link>
//         </p>
//       </div>
//     )
//   }
// }

// export default TaggedPosts

// export const pageQuery = graphql`
//   query($tag: String) {
//     allMarkdownRemark(
//       limit: 1000
//       sort: {order: DESC, fields: [fields___date]}
//       filter: { frontmatter: { tags: { in: [$tag] } } }
//     ) {
//       totalCount
//       edges {
//         node {
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//           }
//         }
//       }
//     }
//   }
// `