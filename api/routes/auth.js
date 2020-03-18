const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

router.post('/create', controller.create)
router.post('/token', controller.token)

module.exports = router