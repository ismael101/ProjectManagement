const express = require('express')
const router = express.Router()
const controller = require('../controllers/project')

router.get('/', controller.getprojects)
router.get('/:id', controller.getproject)
router.post('/', controller.createproject)
router.patch('/:id', controller.updateproject)
router.delete('/:id', controller.deleteproject)
router.get('/task/', controller.gettasks)
router.get('/task/:id', controller.gettask)
router.post('/task/:id', controller.createtask)
router.patch('/task/:id', controller.updatetask)
router.delete('/task/:id', controller.deletetask)

module.exports = router