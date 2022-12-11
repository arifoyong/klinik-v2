const User = require('../models/users')()

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll()
    return  res.status(200).json(users);
  } catch (err) {
    next(err)
  }
}

const getUserByEmail = async (req, res, next) => {
  try {
    const foundUser = await User.findOne('email', req.params.email)
    return  res.status(200).json(foundUser);
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAllUsers,
  getUserByEmail
}