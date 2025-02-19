const { xssClean } = require('../utils/xssClean')

function xss() {
  return (req, res, next) => {
    if(req.body) req.body = xssClean(req.body)
    if(req.query) req.query = xssClean(req.query)
    if(req.params) req.params = xssClean(req.params)

    next()
  }
}

module.exports = xss