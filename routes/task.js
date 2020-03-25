const express = require('express')
const router = express.Router()
const controller = require('../controllers/task')

router.get('/', controller.gettasks)
router.get('/:id', controller.gettask)
router.post('/', controller.createtask)
router.patch('/:id', controller.updatetask)
router.delete('/:id', controller.deletetask)


module.exports = router