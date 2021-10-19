/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
express().use(cookieSession({
  name: 'session',
  keys: ['some-veryveryveryvery-long-key-1', 'not-so-long key 2, but ok!']
}));

module.exports = (db) => {

  router.get("/", (req, res) => {
    const query = `SELECT order_id, created_at AS date, prep_time, menu_items.name AS item_name, price, quantity
      FROM order_items
      JOIN orders ON order_id = orders.id
      JOIN menu_items ON menu_item_id = menu_items.id
      WHERE customer_id = $1
        AND created_at + prep_time < Now()
      ORDER BY created_at DESC;`
    const params = [req.session.userId] 

    db.query(query, params)
      .then(data => {
        const fullHistory = data.rows;
        
        const orders = {};
        for(let order of fullHistory) {
          let orderId = 'orderId-' + order.order_id;
          if (!orders[orderId]) {
            orders[orderId] = {
              orderId: order.order_id,
              date: order.date,
              buyAgain: order.price * order.quantity,
              status: order.date + order.prep_time < Date()? 'Completed' : 'In progress'
            };
          } else {
            orders[orderId].buyAgain += order.price * order.quantity;
          }
        }
        const templateVars = { fullHistory, orders, userId: req.session.userId };
        console.log(templateVars)
        res.render("../views/history.ejs", templateVars)
      })
      .catch(err => {
        res.status(500)
      });
  });

  return router;
};