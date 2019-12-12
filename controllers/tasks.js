const Tasks = require('../models/').Tasks
const Sequelize = require('sequelize')

exports.getTasks = (req,res,next) => {
    Tasks.findAll({where:{team_id:req.team_id}})
         .then(tasks => {
             res.status(200).json(tasks)
         })
         .catch(error => {
             res.status(404).json(error)
         })
}

exports.getTask = (req,res,next) => {
    Tasks.findOne({where:{team_id:req.team_id, id:req.params.id}})
         .then(task => {
             res.status(200).json(task)
         })
         .catch(error => {
             res.status(404).json(error)
         })
}

exports.createTask = (req,res,next) => {
    if(req.team_id == req.body.team_id){
        Tasks.create(req.body)
             .then(() => {
                 res.status(200).json({message:'Task Created'})
             })
             .catch(error => {
                if (error instanceof Sequelize.ValidationError) {
                    let messages = error.errors.map( (e) => e.message)
                    return res.status(400).json(messages)
                }else{
                    return next(error)
                }
             })
    }else{
        res.status(401).json({error:'Not Authorized'})
    }
}

exports.updateTask = (req,res,next) => {
    Tasks.findOne({where:{team_id:req.team_id,id:req.params.id}})
         .then(() => {
            Tasks.update(req.body,{id:req.params.id})
            .then(() => {
                res.status(200).json({message:'Task Updated'})
            })
            .catch(error => {
                if (error instanceof Sequelize.ValidationError) {
                    let messages = error.errors.map( (e) => e.message)
                    return res.status(400).json(messages)
                }else{
                    return next(err)
                }
            })
         })
         .catch(error => {
             res.status(400).json(error)
         })
}


exports.deleteTask = (req,res,next) => {
    Tasks.findOne({where:{team_id:req.team_id, id:req.params.id}})
         .then(() => {
             Tasks.destroy({where:{id:req.params.id}})
                  .then(() => {
                      res.status(200).json({message:'Task Deleted'})
                  })
                  .catch(error => {
                      res.status(400).json(error)
                  })
         })
         .catch(error => {
             res.status(400).json(error)
         })
}