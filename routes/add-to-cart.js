const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const productID = req.body.id;
    const queryParams = [productID];
    let query = `
    SELECT id, name, price
      FROM menu_items
      WHERE id = $1;
    `;
    db.query(query, queryParams)
      .then(data => {
        const item = data.rows;
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
