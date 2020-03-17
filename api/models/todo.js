const Task = require('./task')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    user:{ type: Schema.Types.ObjectId, ref: 'User'},
    name:{
        type: Schema.Types.String,
        required: true
    },
    tasks:[{ type: Schema.Types.ObjectId, ref: 'Task' }]
},{
    timestamps:true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})

todoSchema.virtual('progress').get(function() {
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

todoSchema.virtual('complete').get(function() {
    let flag = true
    this.tasks.forEach(element => {
        if(!element.complete){
            flag = false
        }
    })
    return flag
})

todoSchema.pre('remove', function(next) {
    this.tasks.forEach(element => {
        Task.remove({_id:element})
    })
    next()
})


const Todo = new mongoose.model('Todo', todoSchema)

module.exports = Todo