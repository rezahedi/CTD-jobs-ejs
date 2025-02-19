const csrf = require('host-csrf');

const storeLocals = (req, res, next) => {
  res.locals.csrfToken = csrf.token(req, res)
  if (req.user) {
    res.locals.user = req.user;
  } else {
    res.locals.user = null;
  }
  res.locals.info = req.flash("info");
  res.locals.errors = req.flash("error");
  next();
};

module.exports = storeLocals;