const express = require('express')
const projectControllers = require('../controllers/projects')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/',auth,projectControllers.getProjects)

router.get('/:id',auth,projectControllers.getProject)

router.post('/',auth,projectControllers.createProject)

router.patch('/:id',auth,projectControllers.updateProject)

router.delete('/:id',auth,projectControllers.deleteProject)

module.exports = router