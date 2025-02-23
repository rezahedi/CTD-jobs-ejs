const csrf = require('host-csrf');

const storeLocals = (req, res, next) => {
  res.locals.csrfToken = csrf.token(req, res)
  res.locals.user = req.user || null;
  res.locals.info = req.flash("info");
  res.locals.errors = req.flash("error");
  next();
};

module.exports = storeLocals;