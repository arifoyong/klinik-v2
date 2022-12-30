const jwt = require('jsonwebtoken')
const { createError } = require('../services/createError')

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secrettoken'

// const isAuthorized = (req, res, next) => {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]


//   console.log("authHeader", authHeader)
//   if (token == null) {
//     throw createError({statusCode:403, message:'Unauthorized'})
//   }

//   jwt.verify(token, TOKEN_SECRET , (err, user) => {
//     console.log("token")
//     if (err) {
//       throw createError({statusCode:500, message:err.message})
//     }

//     return next()
//   })
// }

const isAuthorized = (req, res, next) => {
  const token = req.cookies.jwt_token

  if (token == null) {
    throw createError({statusCode:403, message:'Unauthorized'})
  }

  jwt.verify(token, TOKEN_SECRET , (err, user) => {
    if (err) {
      console.log("error in jwt verification")
      throw createError({statusCode:500, message:err.message})
    }

    return next()
  })
}

module.exports =  isAuthorized