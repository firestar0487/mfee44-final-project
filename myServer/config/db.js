require('dotenv').config();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect(err => {
    if (err) {
        console.error('連接資料庫時發生錯誤：', err);
        process.exit(1);
    }
    console.log('已連接到資料庫');
});

module.exports = db;