const express = require("express");
require("express-async-errors");
const bodyParser = require("body-parser").urlencoded({ extended: true });

require("dotenv").config(); // to load the .env file into the process.env object
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");
app.use( bodyParser );

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// secret word handling
app.get("/secretWord", (req, res) => {
  if ( !req.session.secretWord ) {
    req.session.secretWord = "mY.sEcReT-wOrD";
  }

  res.render("secretWord", { secretWord: req.session.secretWord });
});

app.post("/secretWord", (req, res) => {
  req.session.secretWord = req.body.secretWord;
  res.redirect("/secretWord");
});

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
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();