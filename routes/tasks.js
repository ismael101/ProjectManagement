const express = require('express')
const tasksControllers = require('../controllers/tasks')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/',auth,tasksControllers.getTasks)

router.get('/:id',auth,tasksControllers.getTask)

router.post('/',auth,tasksControllers.createTask)

router.patch('/',auth,tasksControllers.updateTask)

router.delete('/:id',auth,tasksControllers.deleteTask)

module.exports = router