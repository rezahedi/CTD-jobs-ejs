const express = require("express");
require("express-async-errors");
const bodyParser = require("body-parser").urlencoded({ extended: true });
const cookieParser = require('cookie-parser')

const helmet = require('helmet')
const rateLimiter = require('express-rate-limit');
const xss = require('./middlewares/xss')
const hpp = require('hpp')
const csrf = require('host-csrf')

require("dotenv").config(); // to load the .env file into the process.env object
const session = require("express-session");

const connectFlash = require("connect-flash");

const app = express();

app.set("view engine", "ejs");
app.use(
  rateLimiter({
    windowMs: 60 * 1000, // 1 min
    max: 60, // max requests per IP and per amount of time above, that is 60 request max per a minute
  }),
  cookieParser(process.env.SESSION_SECRET),
  bodyParser,
  helmet(),
  hpp(),
  xss(),
);

const MongoDBStore = require("connect-mongodb-session")(session);
const url = process.env.MONGO_URI;

const store = new MongoDBStore({
  // may throw an error, which won't be caught
  uri: url,
  collection: "ctd-jobs-ejs-mySessions",
});
store.on("error", function (error) {
  console.log(error);
});

const sessionParams = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: store,
  cookie: { secure: false, sameSite: "strict" },
};

let csrfDevelopmentMode = true
if (app.get("env") === "production") {
  csrfDevelopmentMode = false;
  app.set("trust proxy", 1); // trust first proxy
  sessionParams.cookie.secure = true; // serve secure cookies
}

const csrfOptions = {
  protected_operations: ["POST"],
  protected_content_type: ["application/json"],
  development_mode: csrfDevelopmentMode,
}
// Initialize and return middleware
const csrfMiddleware = csrf(csrfOptions);
app.use(csrfMiddleware)

app.use(session(sessionParams));

app.use( connectFlash() );

const passport = require("passport");
const passportInit = require("./passport/passportInit");

passportInit();
app.use( passport.initialize(), passport.session() );

app.use(require("./middlewares/storeLocals"));
app.get("/", (req, res) => {
  res.render("index", {
    csrfToken: csrf.token(req, res)
  });
});
app.use("/sessions", require("./routes/sessionRoutes"));

// secret word handling
const auth = require("./middlewares/auth");
const secretWordRouter = require("./routes/secretWord");
app.use("/secretWord", auth, secretWordRouter);

app.use((req, res) => {
  res.status(404).send(`That page (${req.url}) was not found.`);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
  console.log(err);
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await require("./db/connect")(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();