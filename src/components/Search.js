// import React from 'react'
// import { Link } from 'gatsby'
// import { Index } from 'elasticlunr'
// import Styled from 'styled-components'
// import SearchBar from 'material-ui-search-bar'

// export default class Search extends React.Component {
//   // constructor(props) {
//   //   super(props)
//   //   this.state = {
//   //     query: ``,
//   //     results: [],
//   //   }
//   // }

//   // queryIndex(query) {
//   //   this.index = this.index ? this.index : Index.load(this.props.searchIndex)
//   //   this.setState({
//   //     query,
//   //     results: this.index.search(
//   //       query, 
//   //       { expand: true }
//   //     ).map(({ ref }) => this.index.documentStore.getDoc(ref))
//   //   })
//   // }

//   render() {
//     console.log(this.state.results)
//     return (
//       <div>
//         <SearchBar
//           value={this.state.query}
//           onChange={(newValue) => this.queryIndex(newValue)}
//         />
//         <ul>
//           {this.state.results.map(page => (
//             <li key={page.id}>
//               <Link to={"/" + page.path}>{page.title}</Link>
//               {": " + page.tags.join(`,`)}
//             </li>
//           ))}
//         </ul>
//       </div>
//     )
//   }
// }