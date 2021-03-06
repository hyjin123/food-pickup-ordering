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

    const isLoggedIn = req.session.userId;
    console.log(isLoggedIn)
    const templateVars = { userId: isLoggedIn }
    !isLoggedIn ? res.render('login') : ( isLoggedIn !== 1 ? res.render('./index.ejs', templateVars) : null)

    const query = `
    SELECT order_id, created_at as date, prep_time, menu_items.name AS item_name, price, quantity, note,
    customer_id, customers.name as customer_name, customers.phone_number as customer_phone
    FROM order_items
    JOIN orders ON order_id = orders.id
    JOIN menu_items ON menu_item_id = menu_items.id
    JOIN customers ON customer_id = customers.id
    ORDER BY order_id DESC;`

    const addMinutes = function(date, minutes) {
      return new Date(date.getTime() + minutes*60000)
    }

    db.query(query)
    .then(data => {
      const fullHistory = data.rows;
      const orders = {};
      for(let order of fullHistory) {
        let orderId = 'orderId-' + order.order_id;
        if (!orders[orderId]) {
          let minutes = Math.round((order.prep_time - new Date())/ 1000 / 60)
          orders[orderId] = {
            customerId: order.customer_id,
            customerName: order.customer_name,
            customerPhone: order.customer_phone,
            orderId: order.order_id,
            date: order.date,
            contents: [`${[order.item_name]} x ${[order.quantity]}`],
            buyAgain: order.price * order.quantity,
            noteInOrder: `${order.note}` || 'No note added in this order.',
            status: minutes > 0 ? `${minutes} minutes until completed`: `Completed`
            };
          } else {
            orders[orderId].contents.push(`${[order.item_name]} x ${[order.quantity]}`);
            orders[orderId].buyAgain += order.price * order.quantity;
          }
        }
        const templateVars = { orders };
        res.render("../views/backstore.ejs", templateVars)
      })
      .catch(err => {
        res.status(500)
      });
  });

  return router;
};
