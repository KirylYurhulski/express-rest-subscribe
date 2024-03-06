const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    return res.status(401).send({ errors: result.array() })
  }

  next()
}
