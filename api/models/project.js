const mongoose = require('mongoose')
const Task = require('./task')
const Schema = mongoose.Schema

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
    tasks:[{ type: Schema.Types.ObjectId, ref: 'Task' }],
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

projectSchema.virtual('progress').get(function() {
    let counter = 0
    let progress = 0
    this.tasks.forEach(element => {
        counter++
        if(element.complete){
            progress++
        }
    });
    return (progress/counter) * 100
  });

projectSchema.virtual('complete').get(function() {
    let flag = true
    this.tasks.forEach(element => {
        if(!element.complete){
            flag = false
        }
    })
    return flag
})

projectSchema.pre('remove', function(next) {
    this.tasks.forEach(element => {
        Task.deleteOne({_id:element})
    })
    next()
})
projectSchema.virtual('overdue').get(function() {
    if(this.due > new Date.now()){
        return true
    }else{
        return false
    }
})


const Project = new mongoose.model('Project', projectSchema)

module.exports = Project