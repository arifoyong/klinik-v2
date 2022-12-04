const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const db = require('../services/db')

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secrettoken'

function generateAccessToken(data, expiresIn='60s') {
  return jwt.sign(data, TOKEN_SECRET, { expiresIn: expiresIn});
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, TOKEN_SECRET , (err, user) => {
    console.log(err)

    if (err) return res.status(403).json({msg: 'unauthorized'})

    // req.user = user

    // next()
    return res.status(200).json(user)
  })
}

const signUp = async (req, res) => {
  if (!req.body)  return res.status(400).json({status: "error", error: "no request body found"})

  let { email, username, password, role } = req.body
  if (password === '' || typeof password === 'undefined') return res.status(400).json({status: "error", error: "password cannot be empty"})

  const [rows] = await db.query(`select * from user where email=?`, [email])
  if (rows.length > 0) {
    return res.status(400).json({status: "error", error: "email is taken"})
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)

  const [result] = await db.query(`insert into user (email, username, password, role) values(?, ?, ?, ?)`, [email, username, hashedPassword, role])
                            .catch(err => [{status: "error", error: err.message}])
  if (result.error) return res.status(400).json({status: "error", error: result.error})

  return res.status(200).json({status: "success", data: "signup success"})
}

const signIn = async (req, res) => {
  if (!req.body)  return res.status(400).json({status: "error", error: "no request body found"})

  const userInput = req.body

  console.log('Request to signin', userInput.email, userInput.password)
  const [rows] = await db.query(`select * from user where email=?`, [userInput.email])
  if (rows.length === 0) {
    return res.status(400).json({status: "error", error: "email not found"})
  }

  const { email, username, password, role } = rows[0]

  const isValidUser = await bcrypt.compare(userInput.password, password)
  if (!isValidUser) {
    return res.status(400).json({status: "error", error: "wrong password"})
  }

 
  const token = generateAccessToken({ email,  username, role })
  res.cookie('token', token, { maxAge: 3600, httpOnly: true, secure: true });
  return res.status(200).json({token, user: {email, username, role}})
}

const signOut = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Signout success" });
};


module.exports = {
  signUp,
  signIn,
  authenticateToken,
  signOut
}