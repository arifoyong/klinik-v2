const db = require('../services/db')

const getAllUsers = async (req, res) => {
  const [rows] = await db.query("select * from user")
  return res.status(200).json({status: "success", data: rows});
}

const getUserByEmail = async (req, res) => {
  const [rows] = await db.query(`select * from user where email=?`, [req.params.email])
  return res.status(200).json({status: "success", data: rows});
}

const createUser = async (req, res) => {
  if (!req.body)  return res.status(400).json({status: "error", error: "no request body found"})

  let { email, password } = req.body

  console.log(req.body)
  let query = `insert into user (email, password) values(?, ?)`
  const [result] = await db.query(query, [email, password])
                            .catch(err => [{status: "error", error: err.message}])

  if (result.error) return res.status(400).json({status: "error", error: result.error})
  
  console.log(result)
  return res.status(200).json({status: "success", data: `user: was created`})
}


module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser
}