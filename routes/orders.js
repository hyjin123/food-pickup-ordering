const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `
    SELECT menu_items.name, menu_items.price, order_items.quantity
      FROM menu_items
      JOIN order_items ON menu_item_id = menu_items.id
      JOIN orders ON order_id = orders.id
      WHERE order_id = 1
      `;
    console.log(query);
    db.query(query)
    .then(data => {
      const orders = data.rows;
      res.json({ orders });
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  return router;
  };

