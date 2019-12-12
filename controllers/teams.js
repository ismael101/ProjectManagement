const Teams = require('../models/').Teams


//this is a controller that allows authenticaticated the users to fetch the team name and id
exports.getTeam = (req,res,next) => {
    Teams.findOne({where:{id:req.team_id}})
         .then(team => {
             res.status(200).json(team)
         })
         .catch(error => {
             res.status(400).json(error)
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

//this controller let user update there team
exports.updateTeam = (req,res,next) => {
    //find the team to check if thes user is apart of the team
    Teams.findOne({where:{id:req.team_id}})
         .then(() => {
             //updaed the team here
            Teams.update(req.body,{where:{id:req.team_id}})
                .then(() => {
                    res.status(200).json({message:'Team Updated'})
                })
                //if there is a validation error its raised here
                .catch(error => {
                    if (error instanceof Sequelize.ValidationError) {
                        let messages = error.errors.map( (e) => e.message)
                        return res.status(400).json(messages)
                    }else{
                        next(error)
                    }
                })

         })
         //if there arent any teams that the user is in 400 bad request is raised
         .catch(error => {
             res.status(400).json(error)
         })
}

//this controler lets users delete teams
exports.deleteTeam = (req,res,next) => {
    //find the team to make the user is in the team
    Teams.findOne({where:{id:req.team_id}})
         .then(() => {
             //if the user is in the team delete it here
            Teams.delete({where:{team_id:req.team_id}})
                 .then(() => {
                    res.status(200).json({message:'Team Deleted'})
                 })
                 .catch(error => {
                     res.status(400).json(error)
                 })
         })
         // if the user isnt in the team the 400 bad request error reaised here
         .catch(error => {
             res.status(400).json(error)
         })
}

