const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');

express().use(cookieSession({
  name: 'session',
  keys: ['some-veryveryveryvery-long-key-1', 'not-so-long key 2, but ok!']
}));

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log('req: ',req.body);
    let query = `INSERT INTO orders (customer_id, created_at, note)
    VALUES ($1, now()::date, $2) RETURNING id ;`;
    db.query(query, [req.session.userId, req.body.note])
      .then(data => {
        console.log('orderbutton return: ',data.rows);
        return data.rows[0].id;
      })
      .then(id => {
        console.log('order id: ',id);
        // db.query(`
        //   INSERT INTO order_items (order_id, menu_item_id, quantity)
        //   VALUES ($1, now()::date, $2) RETURNING id ;`
        //   [id, req.body.items[0].item_id])
        //   .then(data => {
        //     console.log(data);
        //   })
        //   .catch(err => {
        //     res
        //       .status(500)
        //       .json({ error: err.message });
          })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });
  return router;
};
