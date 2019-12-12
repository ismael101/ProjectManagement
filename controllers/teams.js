const Teams = require('../models/').Teams
const Users = require('../models/').Users
exports.getMembers = (req,res,next) => {
    Users.findAll({where:{team_id:req.team_id},attributes: ['id', 'username']})
         .then(users => {
            res.status(200).json(users)
         })
         .catch(error => {
            res.status(400).json(error)
         })
}
exports.getTeam = (req,res,next) => {
    Teams.findOne({where:{id:req.team_id}})
         .then(team => {
             res.status(200).json(team)
         })
         .catch(error => {
             res.status(400).json(error)
         })
}

exports.createTeam = (req,res,next) => {
    Teams.create(req.body)
         .then(() => {
            res.status(200).json({message:'Team Created'})
         })
         .catch(error => {
            if (error instanceof Sequelize.ValidationError) {
                let messages = error.errors.map( (e) => e.message)
                return res.status(400).json(messages)
            }else{
                return next(error)
            }
         })
}

exports.updateTeam = (req,res,next) => {
    Teams.findOne({where:{id:req.team_id}})
         .then(() => {
            Teams.update(req.body,{where:{id:req.team_id}})
                .then(() => {
                    res.status(200).json({message:'Team Updated'})
                })
                .catch(error => {
                    if (error instanceof Sequelize.ValidationError) {
                        let messages = error.errors.map( (e) => e.message)
                        return res.status(400).json(messages)
                    }else{
                        next(error)
                    }
                })

         })
         .catch(error => {
             res.status(400).json(error)
         })
}

exports.deleteTeam = (req,res,next) => {
    Teams.findOne({where:{id:req.team_id}})
         .then(() => {
            Teams.delete({where:{team_id:req.team_id}})
                 .then(() => {
                    res.status(200).json({message:'Team Deleted'})
                 })
                 .catch(error => {
                     res.status(400).json(error)
                 })
         })
         .catch(error => {
             res.status(400).json(error)
         })
}

