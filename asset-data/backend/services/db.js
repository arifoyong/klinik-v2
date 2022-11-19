const mysql = require('mysql2')

const connOption = {
  host     : 'mysqldb',
  port     : 3306,
  user     : 'root',
  password : 'password',
  database : 'local_db'
}
// const connOption = {
//   host     : '0.0.0.0',
//   port     : 3306,
//   user     : 'arif',
//   password : 'arif',
//   database : 'test_db'
// }

const dbConn = mysql.createConnection(connOption)
dbConn.connect(err => {
  if (err) throw err;
  console.log("Successfully connected to database")
})

module.exports = dbConn