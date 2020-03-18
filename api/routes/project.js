const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const controller = require('../controllers/project')

router.get('/', controller.getprojects)
router.get('/:id', controller.getproject)
router.post('/', auth, controller.createproject)
router.patch('/:id', auth, controller.updateproject)
router.delete('/:id', auth, controller.deleteproject)


module.exports = router