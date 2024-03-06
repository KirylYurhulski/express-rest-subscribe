const Router = require('express')
const ExperianceController = require('../controllers/ExperianceController')
const CheckAuth = require('../validators/CheckAuth')
const CheckExperiance = require('../validators/CheckExperiance')
const CheckValidationError = require('../validators/CheckValidationError')

const router = new Router()

router.get('/', ExperianceController.getAll)

router.get('/:id', ExperianceController.getOne)

router.post(
  '/',
  CheckAuth,
  CheckExperiance,
  CheckValidationError,
  ExperianceController.create
)

router.patch(
  '/',
  CheckAuth,
  CheckExperiance,
  CheckValidationError,
  ExperianceController.update
)

router.delete('/:id', CheckAuth, ExperianceController.delete)

module.exports = router
