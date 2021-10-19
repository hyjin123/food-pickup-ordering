const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/", (req, res) => {
    const searchText = req.body.search;
    const queryParams = [`%${searchText}%`];
    let query = `
    SELECT * FROM menu_items
    WHERE in_stock = TRUE
    AND name LIKE $1;
    `
    db.query(query, queryParams)
      .then (data => {
        item = data.rows;
        res.json({ item });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  return router;
};
