const express = require('express')
const projectControllers = require('../controllers/projects')
const router = express.Router()

router.get('/',projectControllers.getProjects)

router.get('/:id',projectControllers.getProject)

router.post('/',projectControllers.createProject)

router.patch('/',projectControllers.updateProject)

router.delete('/:id',projectControllers.deleteProject)

module.exports = router