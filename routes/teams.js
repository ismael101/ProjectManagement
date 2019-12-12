const express = require('express')
const teamsController = require('../controllers/teams')
const auth = require('../middleware/auth')
const router = express.Router()


//added middleware to secure these routes that get create update and delete teams
router.get('/',auth,teamsController.getTeam)

router.post('/',auth,teamsController.createTeam)

router.patch('/',auth, teamsController.updateTeam)

router.delete('/',auth,teamsController.deleteTeam)

module.exports = router