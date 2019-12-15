const express = require('express')
const usersControllers = require('../controllers/users')
const auth = require('../middleware/auth')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './images')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage:storage
})

//added these routes to allow users to register, login, and fetch members from their groups
router.get('/members',auth,usersControllers.getMembers)

router.post('/login',usersControllers.login)

router.post('/register',upload.single('image'),usersControllers.register)

module.exports = router