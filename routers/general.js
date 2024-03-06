const Router = require('express')
const GeneralController = require('../controllers/GeneralController')
const CheckAuth = require('../validators/CheckAuth')
const CheckEmail = require('../validators/CheckEmail')
const CheckGeneral = require('../validators/CheckGeneral')
const CheckValidationError = require('../validators/CheckValidationError')

const router = new Router()

router.get('/', GeneralController.getAll)

router.get('/:id', GeneralController.getOne)

router.post(
  '/',
  CheckAuth,
  CheckGeneral,
  CheckEmail,
  CheckValidationError,
  GeneralController.create
)

router.patch(
  '/',
  CheckAuth,
  CheckGeneral,
  CheckEmail,
  CheckValidationError,
  GeneralController.update
)

router.delete('/:id', CheckAuth, GeneralController.delete)

module.exports = router
