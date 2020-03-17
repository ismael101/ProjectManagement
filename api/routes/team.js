const express = require('express')
const multer = require('multer')
const router = express.Router()
const controller = require('../controllers/team')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads/images')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage:storage
})

router.get('/', controller.getteams)
router.get('/:id', controller.getteam)
router.post('/', controller.createteam)
router.patch('/:id', controller.updateteam)
router.delete('/:id', controller.deleteteam)
router.get('/users/', controller.getusers)
router.get('/users/:id', controller.getuser)
router.post('/users/:id', upload.single('avatar') ,controller.createuser)
router.patch('/users/:id', controller.updateuser)
router.delete('/users/:id', controller.deleteuser)




module.exports = router