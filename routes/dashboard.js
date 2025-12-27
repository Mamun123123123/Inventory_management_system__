const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const stats = {};

  db.query('SELECT COUNT(*) AS totalCategories FROM categories', (err, catResult) => {
    if (err) return res.status(500).json(err);
    stats.totalCategories = catResult[0].totalCategories;

    db.query('SELECT COUNT(*) AS totalProducts FROM products', (err, prodResult) => {
      if (err) return res.status(500).json(err);
      stats.totalProducts = prodResult[0].totalProducts;

      db.query(
        'SELECT COUNT(*) AS lowStock FROM products WHERE quantity < 5',
        (err, lowResult) => {
          if (err) return res.status(500).json(err);
          stats.lowStock = lowResult[0].lowStock;

          res.json(stats);
        }
      );
    });
  });
});

module.exports = router;
