const Tasks = require('../models/').Tasks
const Sequelize = require('sequelize')

//created this controller tp get all the tasks with the users team id
exports.getTasks = (req,res,next) => {
    Tasks.findAll({where:{team_id:req.team_id}})
         .then(tasks => {
             res.status(200).json(tasks)
         })
        //returned a 404 not found error for not finding any tasks with the users team id
         .catch(error => {
             res.status(404).json(error)
         })
}
//created this controller to get a specific task with the users team id
exports.getTask = (req,res,next) => {
    Tasks.findOne({where:{team_id:req.team_id, id:req.params.id}})
         .then(task => {
             res.status(200).json(task)
         })
         .catch(error => {
             //returned a 404 not found error for not finding any task with a corresponding id and team id 
             res.status(404).json(error)
         })
}

//created this controller to create a task
exports.createTask = (req,res,next) => {
    //check if the tokens team id matches the team id in the json to prevent users from creating projects not for their authorized team
    if(req.team_id == req.body.team_id){
        Tasks.create(req.body)
             .then(() => {
                 res.status(200).json({message:'Task Created'})
             })
             .catch(error => {
                 //if there are validation errors i catch them and send them to the user here
                if (error instanceof Sequelize.ValidationError) {
                    let messages = error.errors.map( (e) => e.message)
                    return res.status(400).json(messages)
                }else{
                    //if the error isn't a validation error than i pass it to the server js file 
                    return next(error)
                }
             })
    }else{
        //if the token team id doesnt match the team id in the body than i give a 401 unaithourized error
        res.status(401).json({error:'Not Authorized'})
    }
}

//created this controller to update the task
exports.updateTask = (req,res,next) => {
    //checked if the task the user wants to update is theirs to prevent user from updating tasks that arent theirs
    Tasks.findOne({where:{team_id:req.team_id,id:req.params.id}})
         .then(() => {
              //if it does i update it here
            Tasks.update(req.body,{id:req.params.id})
            .then(() => {
                res.status(200).json({message:'Task Updated'})
            })
            .catch(error => {
                //if there are validation errors i catch them and send them to the user here
                if (error instanceof Sequelize.ValidationError) {
                    let messages = error.errors.map( (e) => e.message)
                    return res.status(400).json(messages)
                }else{
                    //if the error isn't a validation error than i pass it to the server js file
                    return next(err)
                }
            })
         })
            //if there aren't task with a corresponding id and team id from the token i raise a 400 bad request error
         .catch(error => {
             res.status(400).json(error)
         })
}

//created this controller to delete a task
exports.deleteTask = (req,res,next) => {
    //checked if the task the user wants to delete is theirs to prevent user from deleting tasks that arent theirs
    Tasks.findOne({where:{team_id:req.team_id, id:req.params.id}})
         //if it does i destroy it here
         .then(() => {
             Tasks.destroy({where:{id:req.params.id}})
                  .then(() => {
                      res.status(200).json({message:'Task Deleted'})
                  })
                  .catch(error => {
                      //if theres an error i raise a bad request here
                      res.status(400).json(error)
                  })
         })
         .catch(error => {
            //if there aren't projects with a corresponding id and team id from the token i raise a 400 bad request error
             res.status(400).json(error)
         })
}