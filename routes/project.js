const express = require('express')
const router = express.Router()
const controller = require('../controllers/project')

router.get('/', controller.getprojects)
router.get('/:id', controller.getproject)
router.post('/', controller.createproject)
router.patch('/:id', controller.updateproject)
router.delete('/:id', controller.deleteproject)


module.exports = router