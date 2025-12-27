const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',          
  database: 'inventory_db',
  port: 3306
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL Connection Failed:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL Database (inventory_db)');
});

module.exports = db;
