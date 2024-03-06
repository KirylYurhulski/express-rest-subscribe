const jwt = require('jsonwebtoken')
const { Login } = require('../models/models')
const bcrypt = require('bcrypt')
require('dotenv').config()
const ApiError = require('../errors/ApiError')

class UserController {
  async registration(req, res, next) {
    const { email, password } = req.body

    Login.findOne({ where: { email } }).then((candidate) => {
      if (candidate) {
        next(ApiError.unauthorized('Пользователь уже существует'))
      }
      bcrypt.hash(password, 5).then((hashPassword) => {
        if (!hashPassword) {
          next(ApiError.unauthorized('Не удалось зашифровать пароль'))
        }
        Login.create({ email, password: hashPassword }).then((newUser) => {
          res.json(UserController.getToken(newUser.id, email, hashPassword))
        })
      })
    })
  }

  async login(req, res, next) {
    const { email, password } = req.body

    Login.findOne({ where: { email: email } }).then((user) => {
      if (!user) {
        next(ApiError.unauthorized('Пользователь не зарегестрирован'))
      }
      if (!bcrypt.compareSync(password, user.password)) {
        next(ApiError.unauthorized('Введен неверный пароль'))
      }
      res.json(UserController.getToken(user.id, user.email, user.password))
    })
  }

  async authorization(req, res) {
    res.json(
      UserController.getToken(
        req.user.id,
        req.user.email,
        req.user.hashPassword
      )
    )
  }

  static getToken(id, email, hashPassword) {
    return jwt.sign({ id, email, hashPassword }, process.env.SECURITY_KEY, {
      expiresIn: '1h',
    })
  }
}

module.exports = new UserController()
