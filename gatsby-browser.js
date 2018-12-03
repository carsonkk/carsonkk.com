import Cookies from 'universal-cookie'

export function onClientEntry() {
  const cookies = new Cookies()
  if(cookies.get('theme') === undefined) {
    cookies.set('theme', 'dark', { path: '/' })
  }  
}