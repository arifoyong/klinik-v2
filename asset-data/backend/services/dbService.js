const mysql = require('mysql2')

const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE

const connOption = {
  connectionLimit : 5,
  host     : DB_HOST,
  port     : DB_PORT,
  user     : DB_USER,
  password : DB_PASSWORD,
  database : DB_DATABASE
}
  
const executeQuery = async (sqlQuery, params) => {
  const dbConn = await mysql.createPool(connOption).promise()
  const [rows, ] = await dbConn.query(sqlQuery, params)

  await dbConn.end()
  return rows
}

module.exports = executeQuery



// const mysql = require('mysql2')

// const DB_HOST = process.env.DB_HOST
// const DB_PORT = process.env.DB_PORT
// const DB_USER = process.env.DB_USER
// const DB_PASSWORD = process.env.DB_PASSWORD
// const DB_DATABASE = process.env.DB_DATABASE

// // const connOption = {
// //   host     : 'mysqldb',
// //   port     : 3306,
// //   user     : 'root',
// //   password : 'password',
// //   database : 'local_db'
// // }

// const connOption = {
//   connectionLimit : 10,
//   host     : DB_HOST,
//   port     : DB_PORT,
//   user     : DB_USER,
//   password : DB_PASSWORD,
//   database : DB_DATABASE
// }
  
// const dbConn = mysql.createPool(connOption).promise()

// module.exports = dbConn