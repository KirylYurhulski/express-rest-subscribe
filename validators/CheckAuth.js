const jwt = require('jsonwebtoken')
require('dotenv').config()
const ApiError = require('../errors/ApiError')

module.exports = function (req, res, next) {
  try {
    const token = req.header('Authorization').split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECURITY_KEY)
    req.user = decoded
    next()
  } catch (e) {
    next(ApiError.internal('Пользователь не авторизован'))
  }
}
