const mysql = require('mysql2')

const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE

// const connOption = {
//   host     : 'mysqldb',
//   port     : 3306,
//   user     : 'root',
//   password : 'password',
//   database : 'local_db'
// }


const connOption = {
  host     : DB_HOST,
  port     : DB_PORT,
  user     : DB_USER,
  password : DB_PASSWORD,
  database : DB_DATABASE
}

const dbConn = mysql.createConnection(connOption)
dbConn.connect(err => {
  if (err) throw err;
  console.log("Successfully connected to database")
})

module.exports = dbConn