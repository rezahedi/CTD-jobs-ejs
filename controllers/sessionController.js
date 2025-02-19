const User = require("../models/User");
const parseVErr = require("../utils/parseValidationErrs");
const csrf = require('host-csrf')

const registerShow = (req, res) => {
  res.render("register", {
    csrfToken: csrf.token(req, res)
  });
};

const registerDo = async (req, res, next) => {
  if (req.body.password != req.body.password1) {
    req.flash("error", "The passwords entered do not match.");
    return res.render("register", {
      errors: req.flash("errors"),
      csrfToken: csrf.token(req, res)
    });
  }
  try {
    await User.create(req.body);
  } catch (e) {
    if (e.constructor.name === "ValidationError") {
      parseVErr(e, req);
    } else if (e.name === "MongoServerError" && e.code === 11000) {
      req.flash("error", "That email address is already registered.");
    } else {
      return next(e);
    }
    return res.render("register", { 
      errors: req.flash("errors"),
      csrfToken: csrf.token(req, res)
    });
  }
  res.redirect("/");
};

const logoff = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

const loginShow = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  
  res.render("login", {
    csrfToken: csrf.token(req, res)
  });
};

module.exports = {
  registerShow,
  registerDo,
  logoff,
  loginShow,
};