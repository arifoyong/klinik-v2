const jwt = require('jsonwebtoken')
const User = require('../models/users')()

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secrettoken'

function generateAccessToken(data, expiresIn='600s') {
  return jwt.sign(data, TOKEN_SECRET, { expiresIn: expiresIn});
}


const signUp = async (req, res, next) => {
  try {
    const insertResult = await User.createUser(req.body)
    return res.status(200).json(insertResult)
  } catch (err) {
    next(err)
  } 
}

const signIn = async (req,res,next) => {
  try {
    const user = await User.verifyUser(req.body)
    const token = generateAccessToken(user)

    console.log("set cookie")
    res.cookie('jwt_token', token, {httpOnly:true, maxAge: 10 * 60 * 1000, path:"/"})
    return res.status(200).json({token, user})
  } catch (err) {
    next(err)
  } 
}

const signOut = (req, res) => {
  res.clearCookie("jwttoken");
  res.json({ message: "Signout success" });
}


module.exports = {
  signUp,
  signIn,
  signOut
}

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]

//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token, TOKEN_SECRET , (err, user) => {
//     console.log(err)

//     if (err) return res.status(403).json({msg: 'unauthorized'})


//     return res.status(200).json(user)
//   })
// }
