const express = require('express')
const tasksControllers = require('../controllers/tasks')
const router = express.Router()

router.get('/',tasksControllers.getTasks)

router.get('/:id',tasksControllers.getTask)

router.post('/',tasksControllers.createTask)

router.patch('/',tasksControllers.updateTask)

router.delete('/:id',tasksControllers.deleteTask)

module.exports = router