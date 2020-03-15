const express = require('express')
const router = express.Router()
const controller = require('../controllers/todo')

router.get('/', controller.gettodos)
router.get('/:id', controller.gettodo)
router.post('/', controller.createtodo)
router.patch('/:id', controller.updatetodo)
router.delete('/:id', controller.deletetodo)
router.get('/', controller.gettask)
router.get('/:id', controller.gettask)
router.post('/:id', controller.createtask)
router.patch('/:id', controller.updatetask)
router.delete('/:id', controller.deletetask)

module.exports = router