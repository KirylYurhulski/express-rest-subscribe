const Router = require('express')
const EducationController = require('../controllers/EducationController')
const CheckAuth = require('../validators/CheckAuth')
const CheckEducation = require('../validators/CheckEducation')
const CheckValidationError = require('../validators/CheckValidationError')

const router = new Router()

router.get('/', EducationController.getAll)

router.get('/:id', EducationController.getOne)

router.post(
  '/',
  CheckAuth,
  CheckEducation,
  CheckValidationError,
  EducationController.create
)

router.patch(
  '/',
  CheckAuth,
  CheckEducation,
  CheckValidationError,
  EducationController.update
)

router.delete('/:id', CheckAuth, EducationController.delete)

module.exports = router
