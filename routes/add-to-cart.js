const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  let item;
  router.post("/", (req, res) => {
    const productID = req.body.id;
    const queryParams = [productID];
    let query = `
    SELECT name, price
      FROM menu_items
      WHERE id = $1;
    `;
    db.query(query, queryParams)
      .then(data => {
        item = data.rows;
        res.json({ item });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

return router;
}
