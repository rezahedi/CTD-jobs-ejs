const express = require("express");
// const passport = require("passport");
const router = express.Router();

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
    // passport.authenticate("local", {
    //   successRedirect: "/",
    //   failureRedirect: "/sessions/login",
    //   failureFlash: true,
    // })
    (req, res) => {
      res.send("Not yet implemented.");
    }
  );
router.route("/logoff").post(logoff);

module.exports = router;