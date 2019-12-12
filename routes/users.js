const express = require('express')
const usersControllers = require('../controllers/users')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/members',auth,usersControllers.getMembers)

router.post('/login',usersControllers.login)

router.post('/register',usersControllers.register)


module.exports = router