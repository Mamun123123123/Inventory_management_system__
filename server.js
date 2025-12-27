const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const usersRouter = require('./routes/users'); 
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const dashboardRoutes = require('./routes/dashboard');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', usersRouter); 
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Inventory System running at http://localhost:${PORT}`);
});
