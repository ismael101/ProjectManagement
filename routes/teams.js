const express = require('express')
const teamsController = require('../controllers/teams')
const router = express.Router()

router.get('/',teamsController.getTeams)

router.get('/:id',teamsController.getTeam)

router.post('/',teamsController.createTeam)

router.patch('/:id', teamsController.updateTeam)

router.delete('/:id', teamsController.deleteTeam)

module.exports = router