export function TZDate(date) {
  const dateObj = new Date(date)
  const offset = -60000;
  return new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * offset)
}

export function FancyDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const fancyDate = TZDate(date)

  return `${months[fancyDate.getMonth()]} ${fancyDate.getDate()}, ${fancyDate.getFullYear()}`
}
