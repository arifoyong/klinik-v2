const bcrypt = require("bcrypt")

const executeQuery = require('../services/dbService')
const { createError, BAD_REQUEST } = require('../services/createError')

const User = () => {
  const tableName = "user"

  const migrate = async () => {
    const query = `CREATE TABLE IF NOT EXISTS user (
                                      email varchar(50) NOT NULL,
                                      password varchar(50) NOT NULL,
                                      PRIMARY KEY (email)
                                    )`
    const result = await executeQuery(query)
    return result
  }

  const findAll = async () => {
    const query = `SELECT * from ${tableName}`
    const result = await executeQuery(query)
  
    return result
  }

  const countUser = async () => {
    const query = `SELECT COUNT (*) from ${tableName}`
    const result = await executeQuery(query)

    return result
  }

  const findOne = async (field, value) => {
    const query = `SELECT * from ${tableName} WHERE ${field} = ?`
    const params = [value]
    const result = await executeQuery(query, params)
  
    return result
  }

  const createUser = async ({email, username, password, role}) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password.toString(), salt)

    const query = `insert into user (email, username, password, role) values(?, ?, ?, ?)`
    const params = [email, username, hashedPassword, role]
    try {
      const result = await executeQuery(query, params)
      return result
    } catch (err) {
      throw createError({statusCode:BAD_REQUEST, message:err.message})
    }
  }

  const verifyUser = async ({email, password}) => {
    const [foundUser] = await executeQuery(`select * from user where email=?`, [email])
    if (typeof foundUser === 'undefined' || foundUser.length === 0) {
      throw createError({statusCode:BAD_REQUEST, message:'user not found'})
    }
    
    const isValidUser = await bcrypt.compare(password, foundUser.password)
    if (!isValidUser) {
      throw createError({statusCode:BAD_REQUEST, message:'password not match'})
    }
  
    return {userName:foundUser.username, role:foundUser.role}
  }


  
  return {
    findAll,
    countUser,
    createUser,
    verifyUser,
    findOne,
    migrate
  }
}


module.exports = User