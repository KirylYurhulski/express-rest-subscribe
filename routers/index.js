const Router = require('express')
const user = require('./user')
const general = require('./general')
const experiance = require('./experiance')
const education = require('./education')

const router = new Router()

router.use('/user', user)
router.use('/general', general)
router.use('/experiance', experiance)
router.use('/edu', education)

module.exports = router
