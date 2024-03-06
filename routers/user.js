const Router = require('express')
const UserController = require('../controllers/UserController')
const CheckAuth = require('../validators/CheckAuth')
const CheckEmail = require('../validators/CheckEmail')
const CheckPassword = require('../validators/CheckPassword')
const CheckValidationError = require('../validators/CheckValidationError')

const router = new Router()

router.post(
  '/registration',
  CheckEmail,
  CheckPassword,
  CheckValidationError,
  UserController.registration
)

router.get(
  '/login',
  CheckEmail,
  CheckPassword,
  CheckValidationError,
  UserController.login
)

router.get('/auth', CheckAuth, UserController.authorization)

module.exports = router
