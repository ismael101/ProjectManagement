const Teams = require('../models/').Teams

//this is a controller that allows authenticaticated the users to fetch the team name and id
exports.getTeams = (req,res,next) => {
    Teams.findAll()
        .then((teams) => {
            res.status(200).json(teams)
        })
        .catch(error => {
            res.status(400).json(error)
            console.log(error)
        })
}

//this controller lets user create a team
exports.createTeam = (req,res,next) => {
    //the team is created here
    Teams.create(req.body)
         .then(() => {
             //if its a sucess than the user gets this message
            res.status(200).json({message:'Team Created'})
         })
         .catch(error => {
             //is there is a validation error then its raised here
            if (error instanceof Sequelize.ValidationError) {
                let messages = error.errors.map( (e) => e.message)
                return res.status(400).json(messages)
            }else{
                return next(error)
            }
         })
}


//this controler lets users delete teams
exports.deleteTeam = (req,res,next) => {
    //find the team to make the user is in the team
    if(req.params.id == req.teamid){
        Teams.destroy({where:{id:req.params.id}})
            .then(() => {
                res.status(200).json({message:'Team Deleted'})
            })
            .catch(() => {

            })
    }else{
        res.status(401).json({message:'Un-Authorized Action'})
    }
}

