const express = require("express");
const passport = require("passport");
const router = express.Router();
const csrf = require('host-csrf')
const {
  loginShow,
  registerShow,
  registerDo,
  logoff,
} = require("../controllers/sessionController");

router.route("/register").get(registerShow).post(registerDo);
router
  .route("/login")
  .get(loginShow)
  .post(
    (req, res, next) => {
      res.locals.csrfToken = csrf.refresh(req, res)
      next()
    },
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/sessions/login",
      failureFlash: true,
    })
  );
router.route("/logoff").post(logoff);

module.exports = router;