/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');

express().use(cookieSession({
  name: 'session',
  keys: ['some-veryveryveryvery-long-key-1', 'not-so-long key 2, but ok!']
}));

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM customers;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Route to POST registration: will add user in DB and put the cookie.
  router.post('/register', (req, res) => {
    const { name, email, phone_number, address, city, province, postal_code } = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);
    userContents = [name, email, phone_number, password, address, city, province, postal_code]
    db.query(`INSERT INTO customers (name, email, phone_number, password, address, city, province, postal_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id ;`, userContents)
    .then(data => {
      console.log(data.rows)
      const id = data.rows[0].id;
      req.session.userId = id;
      res.redirect('/');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  // Route to POST login: will put a cookie with the userId. 
  // To read the cookie, use: req.session.userId
  router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(`SELECT id, name, email, password FROM customers WHERE email = $1;`, [email])
    .then(data => {
      const id = data.rows[0].id
      const refPassword = data.rows[0].password;

      if (!email || !password || !id) {
        res.status(400).send('Error 400 - Bad request. Invalid e-mail or password.');
      } else if (bcrypt.compareSync(password, refPassword)) {
        req.session.userId = id
        // will send to the point decision isLoggedIn, if logged in, will load store page.
        res.redirect('/')
        // Instead of redirecting, could just send an object with id, as below:
        // res.send( { user: {id} } );
        // In both situations, the cookie is set with the user id.
      } else {
        // Wrong password. Msg states for email/password due to security reasons.
        res.status(400).send('Error 400 - Bad request. Invalid e-mail or password.');
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  // Route to logout
  router.post('/logout', (req, res) => {
    req.session.userId = null;
    //res.send({});
    res.render('../views/login.ejs'); 
  });

  // Route to access login page
  router.get("/login", (req, res) => {

    console.log('cookie! req.session.userId', req.session.userId );
    const templateVars = { userId: req.session.userId };
     if (templateVars.userId) {
      console.log(templateVars)
      return res.redirect('../..');
    }
    res.render('../views/login.ejs'); 
  });

  // Route to access register page
  router.get("/register", (req, res) => {

    console.log('cookie! req.session.userId', req.session.userId );
    const templateVars = { userId: req.session.userId };
     if (templateVars.userId) {
      console.log(templateVars)
      return res.redirect('../..');
    }
    res.render('../views/register.ejs'); 
  });

  return router;
};
