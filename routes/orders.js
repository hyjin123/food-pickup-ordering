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
        let queryParams = [];
        let queryString = `
        INSERT INTO order_items (order_id, menu_item_id, quantity)
        VALUES `;

        for (const index = 0; index < req.body.items.length; index++) {
          queryString += `($${3 * index + 1}, $${3 * index + 2}, $${3 * index + 3})`;
          if (index < req.body.items.length - 2) {
            queryString +=`, `;
          } else {
            queryString += ` RETURNING *;`;
          }
          queryParams.push(id, req.body.items[index].item_id, req.body.items[index].quantity);
        }

        console.log('queryString; ',queryString, 'queryParams: ', queryParams );

        return db.query(queryString, queryParams)
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });
  return router;
};
