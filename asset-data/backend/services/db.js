const mysql = require('mysql2')

const connOption = {
  host     : 'localhost',
  user     : 'arif',
  password : 'arif',
  database : 'test_db'
}

const dbConn = mysql.createConnection(connOption)
dbConn.connect(err => {
  if (err) throw error;
  console.log("Successfully connected to DB")
})

module.exports = dbConn