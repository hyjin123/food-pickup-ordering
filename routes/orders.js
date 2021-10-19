const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');

express().use(cookieSession({
  name: 'session',
  keys: ['some-veryveryveryvery-long-key-1', 'not-so-long key 2, but ok!']
}));

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log('req: ',req.params);
    console.log('res: ',res.body);
    let query = `INSERT INTO orders (customer_id, created_at)
    VALUES ($1, now()::date) RETURNING id ;`;
    db.query(query, [req.session.userId])
      .then(data => {
        console.log('orderbutton return: ',data.rows);
        return data.rows[0].id;
      })
      .then(id => {

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
