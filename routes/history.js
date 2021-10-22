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
    const query = `SELECT order_id, created_at as date, prep_time, menu_items.name AS item_name, price, quantity, note
    FROM order_items
    JOIN orders ON order_id = orders.id
    JOIN menu_items ON menu_item_id = menu_items.id
    WHERE customer_id = $1
    ORDER BY order_id DESC;`
    const params = [req.session.userId]

    // const addMinutes = function(date, minutes) {
    //   return new Date(date.getTime() + minutes*60000)
    // }

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
              contents: [`${[order.item_name]} x ${[order.quantity]}`],
              buyAgain: order.price * order.quantity,
              noteInOrder: `Order note: ${order.note}` || 'No note added in this order.',
              status: order.prep_time < Date.now()? 'Completed' : `In progress. Will be ready in ${Math.round((order.prep_time-Date.now())/60000)} minutes.`
            };
          } else {
            orders[orderId].contents.push(`${[order.item_name]} x ${[order.quantity]}`);
            orders[orderId].buyAgain += order.price * order.quantity;
          }
        }
        const templateVars = { fullHistory, orders, userId: req.session.userId };
        res.render("../views/history.ejs", templateVars)
      })
      .catch(err => {
        res.status(500)
      });
  });

  return router;
};
