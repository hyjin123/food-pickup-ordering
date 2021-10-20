const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');

express().use(cookieSession({
  name: 'session',
  keys: ['some-veryveryveryvery-long-key-1', 'not-so-long key 2, but ok!']
}));

module.exports = (db) => {
  router.post("/", (req, res) => {

    let query = `INSERT INTO orders (customer_id, created_at, note)
    VALUES ($1, now()::date, $2) RETURNING id ;`;
    db.query(query, [req.session.userId, req.body.note])
      .then(data => {

        const id = data.rows[0].id;
        const orderedList = req.body.items;

        let queryParams = [];
        let queryString = `
        INSERT INTO order_items (order_id, menu_item_id, quantity)
        VALUES `;

        for (let index = 0; index < orderedList.length; index++) {
          queryString += `($${3 * index + 1}, $${3 * index + 2}, $${3 * index + 3})`;
          if (index < orderedList.length - 1) {
            queryString +=`, `;
          } else {
            queryString += ` RETURNING *;`;
          }
          queryParams.push(id, Number(orderedList[index].item_id), Number(orderedList[index].quantity));
        }

        db.query(queryString, queryParams)
          .then(data => {
            // console.log(data.rows);
            return data.rows;
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
