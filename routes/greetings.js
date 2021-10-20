const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');

express().use(cookieSession({
  name: 'session',
  keys: ['some-veryveryveryvery-long-key-1', 'not-so-long key 2, but ok!']
}));

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT name FROM customers WHERE id = $1;`;
    db.query(query, [req.session.userId])
      .then(data => {
        const customerName = data.rows[0].name;
        res.json({ customerName });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};