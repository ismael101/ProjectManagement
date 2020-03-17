const express = require('express')
const router = express.Router()
const controller = require('../controllers/project')

router.get('/', controller.getprojects)
router.get('/:id', controller.getproject)
router.post('/', controller.createproject)
router.patch('/:id', controller.updateproject)
router.delete('/:id', controller.deleteproject)
router.get('/tasks/', controller.gettasks)
router.get('/tasks/:id', controller.gettask)
router.post('/tasks/:id', controller.createtask)
router.patch('/tasks/:id', controller.updatetask)
router.delete('/tasks/:id', controller.deletetask)

module.exports = router