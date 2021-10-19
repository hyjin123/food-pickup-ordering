const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // GET route for menu items
  router.get("/", (req, res) => {
    let query = `
    SELECT * FROM menu_items
    WHERE in_stock = TRUE`;
    console.log(query);
    db.query(query)
      .then(data => {
        const menuItems = data.rows;
        res.json({ menuItems });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
