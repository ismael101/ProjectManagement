const express = require('express')
const router = express.Router()
const controller = require('../controllers/todo')

router.get('/', controller.gettodos)
router.get('/:id', controller.gettodo)
router.post('/', controller.createtodo)
router.patch('/:id', controller.updatetodo)
router.delete('/:id', controller.deletetodo)
router.get('/tasks/', controller.gettask)
router.get('/tasks/:id', controller.gettask)
router.post('/tasks/:id', controller.createtask)
router.patch('/tasks/:id', controller.updatetask)
router.delete('/tasks/:id', controller.deletetask)

module.exports = router