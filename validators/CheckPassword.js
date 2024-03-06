const { body } = require('express-validator')

module.exports = body('password')
  .trim()
  .isLength({ min: 6, max: 255 })
  .withMessage('Пароль должен быть более 6 символов')
