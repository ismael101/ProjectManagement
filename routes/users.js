const express = require('express')
const usersControllers = require('../controllers/users')
const auth = require('../middleware/auth')
const router = express.Router()

//added these routes to allow users to register, login, edit and fetch members from their groups
router.get('/members',auth,usersControllers.getMembers)

router.post('/login',usersControllers.login)

router.post('/register',usersControllers.register)


module.exports = router