const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ error: 'All fields required' });
  }

  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  db.query(sql, [name, email, password], (err) => {
    if (err) return res.json({ error: 'Email already exists' });
    res.json({ message: 'Registration successful' });
  });
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email=? AND password=?`;
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.json({ error: 'Server error' });
    if (result.length === 0)
      return res.json({ error: 'Invalid credentials' });

    res.json({
      message: 'Login successful',
      user: result[0]
    });
  });
});


app.use('/api/dashboard', dashboardRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Inventory System running at http://localhost:${PORT}`);
});
