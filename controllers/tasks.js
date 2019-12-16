const Tasks = require('../models/').Tasks
const Projects = require('../models/').Projects
const Sequelize = require('sequelize')

//created this controller tp get all the tasks with the users team id
exports.getTasks = (req,res,next) => {
    Tasks.findAll({where:{team:req.team}})
         .then(tasks => {
             if(tasks){
                 res.status(200).send(tasks)
             }else{
                 res.status(404).send('No Tasks Found')
             }
         })
        //returned a 404 not found error for not finding any tasks with the users team id
         .catch(err => {
             next(err)
         })
}
//created this controller to get a specific task with the users team id
exports.getTask = (req,res,next) => {
    Tasks.findOne({where:{team:req.team, id:req.params.id}})
         .then(task => {
             if(task){
                 res.status(200).send(task)
             }else{
                 res.status(404).send('No Task Found')
             }
         })
         .catch(err => {
             //returned a 404 not found error for not finding any task with a corresponding id and team id 
             next(err)
         })
}

//created this controller to create a task
exports.createTask = (req,res,next) => {
    //check if the tokens team id matches the team id in the json to prevent users from creating projects not for their authorized team
    if(req.team = req.body.team){
        Projects.findOne({where:{team:req.team,id:req.body.projectid}})
                .then(project => {
                    if(project){
                        Tasks.create(req.body)
                            .then(task => {
                                res.status(200).send('Task Created')
                            })
                            .catch(err => {
                                if (err instanceof Sequelize.ValidationError) {
                                    let messages = err.errors.map( (e) => e.message)
                                    return res.status(400).send(messages)
                                }else{
                                    //if the error isn't a validation error than i pass it to the server js file 
                                    return next(err)
                                }  
                            })
                    }else{
                        res.status(401).send('Cannot Create Task For Project Not Owned')
                    }
                })
                .catch(err => {
                    next(err)
                })
    }else{
        res.status(401).send('Cannot Create Task For Different Teams')
    }
}

//created this controller to update the task
exports.updateTask = (req,res,next) => {
    //checked if the task the user wants to update is theirs to prevent user from updating tasks that arent theirs
    if(req.team == req.body.team){
        Tasks.update(req.body,{where:{team:req.team,id:req.params.id}})
        .then((rm) => {
            if(!rm[0]){
                res.status(404).send('Task Not Found')
            }else{
                res.status(200).send('Task Updated')
            }
        })
        .catch(err => {
            if(err instanceof Sequelize.ValidationError){
                let messages = error.errors.map( (e) => e.message)
                return res.status(400).send(messages)
            }
            else{
                console.log(err)
                next(err)
            }
        })
    }else{
        res.status(401).send('Cannot Change Team of Task')
    }
}

//created this controller to delete a task
exports.deleteTask = (req,res,next) => {
    //checked if the task the user wants to delete is theirs to prevent user from deleting tasks that arent theirs
   Tasks.destroy({where:{teamid:req.teamid,id:req.params.id}})
        .then(() => {
            res.status(200).send('Task Deleted')
        })
        .catch(err => {
            next(err)
        })
}