const Teams = require('../models/').Teams
var Sequelize = require('sequelize')

//this is a controller that allows authenticaticated the users to fetch the team name and id
exports.getTeams = (req,res,next) => {
    Teams.findAll()
        .then((teams) => {
            if(teams){
                res.status(200).send(teams)
            }else{
                res.status(404).send('No Teams Found')
            }
        })
        .catch(err => {
            next(err)
        })
}
exports.getTeam = (req,res,next) => {
    Teams.findOne({where:{id:req.params.id}})
        .then((team) => {
            if(team){
                res.status(200).send(team)
            }else{
                res.status(404).send('No Team Found')
            }
        })
        .catch(err => {
            next(err)
        })
}

//this controller lets user create a team
exports.createTeam = (req,res,next) => {
    //the team is created here
    Teams.create(req.body)
         .then(() => {
             //if its a sucess than the user gets this message
            res.status(200).send('Team Created')
         })
         .catch(err => {
             //is there is a validation error then its raised here
            if (err instanceof Sequelize.ValidationError) {
                let messages = err.errors.map( (e) => e.message)
                return res.status(400).send(messages)
            }else if(err instanceof Sequelize.UniqueConstraintError){
                let messages = err.errors.map((e) => e.message)
                return res.status(400).send(messages)
            }
            else{
                return next(error)
            }
         })
}


//this controler lets users delete teams
exports.deleteTeam = (req,res,next) => {
    //find the team to make the user is in the team
    Teams.destroy({where:{name:req.team}})
        .then(() => {
            res.status(200).send('Team Deleted')
        })
        .catch(err => {
            next(err)
        })
}

