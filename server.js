// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

app.use(cookieSession({
  name: 'session',
  keys: ['some-veryveryveryvery-long-key-1', 'not-so-long key 2, but ok!']
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const historyRoutes = require("./routes/history");
const ordersRoutes = require("./routes/orders");
const menuRoutes = require("./routes/menu");
const greetingRoutes = require("./routes/greetings");
const addToCartRoutes = require("./routes/add-to-cart");
const twilioRoutes = require("./routes/twilio");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/orders", ordersRoutes(db));
app.use("/api/menu", menuRoutes(db));
app.use("/api/add-to-cart", addToCartRoutes(db));
app.use("/api/twilio", twilioRoutes(db));


// Note: mount other resources here, using the same pattern above
app.use("/history", historyRoutes(db));
app.use("/login", usersRoutes(db));
app.use("/register", usersRoutes(db));
app.use("/greetings", greetingRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const isLoggedIn = req.session.userId;
  console.log(isLoggedIn)
  const templateVars = { userId: isLoggedIn }
  isLoggedIn ? res.render('index', templateVars) : res.render('login');
  //res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
