import mysql from 'mysql2/promise.js'
import dotenv from 'dotenv'
dotenv.config()

const mydb = await mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
})
export default mydb

// import dotenv from 'dotenv'
// import mysql from 'mysql'

// dotenv.config()

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// })

// db.connect((err) => {
//   if (err) {
//     console.error('連接資料庫時發生錯誤：', err)
//   }
//   console.log('已連接到資料庫 ')
// })

// export default db
