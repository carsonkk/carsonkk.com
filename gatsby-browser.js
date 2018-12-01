const Cookies = require('universal-cookie')


exports.onClientEntry = () => {
  const cookies = new Cookies();
  if(cookies.get('theme') == undefined) {
    cookies.set('theme', 'dark', { path: '/' })
  }  
}