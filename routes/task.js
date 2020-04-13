//import modules
const express = require('express')
const router = express.Router()

//import controller
const controller = require('../controllers/task')

//CRUD endpoints
router.get('/', controller.gettasks)
router.get('/:id', controller.gettask)
router.post('/', controller.createtask)
router.patch('/:id', controller.updatetask)
router.delete('/:id', controller.deletetask)

//export
module.exports = router