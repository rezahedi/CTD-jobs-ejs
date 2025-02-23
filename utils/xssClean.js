const { inHTMLData } = require('xss-filters')

const xssClean = (data = '') => {
  let isObject = false
  if (typeof data === 'object') {
    data = JSON.stringify(data)
    isObject = true
  }

  data = inHTMLData(data).trim()
  if (isObject) data = JSON.parse(data)

  return data
}

module.exports = {
  xssClean
}