var plugins = [{
      plugin: require('/home/kyle/Code/0PersonalRepos/carsonkk.com/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/kyle/Code/0PersonalRepos/carsonkk.com/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/kyle/Code/0PersonalRepos/carsonkk.com/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/kyle/Code/0PersonalRepos/carsonkk.com/node_modules/gatsby-remark-autolink-headers/gatsby-ssr'),
      options: {"plugins":[],"offsetY":-680},
    },{
      plugin: require('/home/kyle/Code/0PersonalRepos/carsonkk.com/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-131250967-1"},
    },{
      plugin: require('/home/kyle/Code/0PersonalRepos/carsonkk.com/node_modules/gatsby-plugin-favicon/gatsby-ssr'),
      options: {"plugins":[],"logo":"./src/images/favicon.png","injectHTML":true,"icons":{"android":true,"appleIcon":true,"appleStartup":true,"coast":false,"favicons":true,"firefox":true,"twitter":true,"yandex":false,"windows":true}},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}