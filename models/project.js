//import module
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create schema for project
const projectSchema = new Schema({
    _id:{
        type: Schema.Types.ObjectId,
        required:true
    },
    name:{
        type: Schema.Types.String,
        required: true
    },
    description:{
        type: Schema.Types.String,
        required: true
    },
    tasks:[{
         type: Schema.Types.ObjectId, 
         ref: 'Task' 
        }],
    due:{ 
        type: Schema.Types.Date, 
        default: Date.now()
    }
},{
    timestamps:true,
})

//create model
const Project = new mongoose.model('Project', projectSchema)

//export
module.exports = Project