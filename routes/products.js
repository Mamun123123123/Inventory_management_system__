const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

router.post('/', (req, res) => {
  const { name, quantity, price, category_id } = req.body;
  if (!name || quantity == null || price == null || category_id == null)
    return res.status(400).json({ error: 'All fields are required' });

  db.query(
    'INSERT INTO products (name, quantity, price, category_id) VALUES (?,?,?,?)',
    [name, quantity, price, category_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Product added successfully' });
    }
  );
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, quantity, price, category_id } = req.body;
  if (!name || quantity == null || price == null || category_id == null)
    return res.status(400).json({ error: 'All fields are required' });

  db.query(
    'UPDATE products SET name=?, quantity=?, price=?, category_id=? WHERE product_id=?',
    [name, quantity, price, category_id, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Product updated successfully' });
    }
  );
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE product_id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Product deleted successfully' });
  });
});

module.exports = router;
