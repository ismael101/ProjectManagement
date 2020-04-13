//import modules
const express = require('express')
const router = express.Router()

//import controller
const controller = require('../controllers/project')

//CRUD endpoints
router.get('/', controller.getprojects)
router.get('/:id', controller.getproject)
router.post('/', controller.createproject)
router.patch('/:id', controller.updateproject)
router.delete('/:id', controller.deleteproject)

//export
module.exports = router