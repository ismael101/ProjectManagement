const express = require('express')
const teamsController = require('../controllers/teams')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/',auth,teamsController.getTeams)

router.get('/:id',auth,teamsController.getTeam)

router.post('/',auth,teamsController.createTeam)

router.patch('/:id',auth, teamsController.updateTeam)

router.delete('/:id',auth,teamsController.deleteTeam)

module.exports = router