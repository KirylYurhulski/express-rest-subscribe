const { body } = require('express-validator')

module.exports = body('email')
  .trim()
  .isEmail()
  .withMessage('Неверный формат email')
