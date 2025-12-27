const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', (req, res) => {
  db.query('SELECT * FROM categories', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});


router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  db.query('INSERT INTO categories (name) VALUES (?)', [name], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Category added successfully' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  db.query('UPDATE categories SET name=? WHERE category_id=?', [name, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Category updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM categories WHERE category_id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Category deleted successfully' });
  });
});

module.exports = router;
