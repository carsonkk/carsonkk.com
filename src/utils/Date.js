const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function TZDate(date) {
  const dateObj = new Date(date)
  const offset = -60000;
  return new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * offset)
}

function DayOrdinal(n) {
  return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}

export function FancyDateMDY(date) {
  const fancyDate = TZDate(date)
  return `${months[fancyDate.getMonth()]} ${DayOrdinal(fancyDate.getDate())}, ${fancyDate.getFullYear()}`
}

export function FancyDateMD(date) {
  const fancyDate = TZDate(date)
  return `${months[fancyDate.getMonth()]} ${DayOrdinal(fancyDate.getDate())}`
}