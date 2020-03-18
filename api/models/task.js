const mongoose = require('mongoose')
const Project = require('./project')
const Schema = mongoose.Schema

const taskSchema = new Schema({
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
    complete:{
        type: Schema.Types.Boolean,
        default: false
    },
    project:{type: Schema.Types.ObjectId, ref: 'Project'},
    due:{
        type: Schema.Types.Date,
        default: new Date.now()
    },
},{
    timestamps:true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})

taskSchema.virtual('overdue').get(function() {
    if(this.due > new Date.now()){
        return true
    }else{
        return false
    }
})

taskSchema.pre('save', function(next){
    Project.findById(this.project)
        .then(project => {
            project.tasks.push(this._id)
        })
        .catch(error => {
            console.log(error)
        })
    next()
})

const Task = new mongoose.model('Task', taskSchema)

module.exports = Task