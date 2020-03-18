const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const controller = require('../controllers/task')

router.get('/', controller.gettasks)
router.get('/:id', controller.gettask)
router.post('/',auth, controller.createtask)
router.patch('/:id',auth, controller.updatetask)
router.delete('/:id',auth, controller.deletetask)


module.exports = router