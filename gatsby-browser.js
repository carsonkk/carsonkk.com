import Cookies from 'universal-cookie'

export function onClientEntry() {
  const cookies = new Cookies()
  if(cookies.get('theme') === undefined) {
    cookies.set('theme', 'dark', { path: '/' })
  }
  if(cookies.get('snow') === undefined) {
    cookies.set('snow', 'false', { path: '/' })
  }
  if(cookies.get('searchFiltersVisible') === undefined) {
    cookies.set('searchFiltersVisible', 'false', { path: '/' })
  }
  if(cookies.get('resume') === undefined) {
    cookies.set('resume', 'CV', { path: '/' })
  }
}