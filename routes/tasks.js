const express = require('express')
const tasksControllers = require('../controllers/tasks')
const auth = require('../middleware/auth')
const router = express.Router()


//added middleware to secure these routes that get create update and delete tasks
router.get('/',auth,tasksControllers.getTasks)

router.get('/:id',auth,tasksControllers.getTask)

router.post('/',auth,tasksControllers.createTask)

router.patch('/:id',auth,tasksControllers.updateTask)

router.delete('/:id',auth,tasksControllers.deleteTask)

module.exports = router