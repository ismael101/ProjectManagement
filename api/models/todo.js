const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    user:{type: mongoose.Schema.Types.ObjectId, ref='User'},
    name:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    description:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    complete:{
        type: mongoose.Schema.Types.Boolean,
        default: false
    }
},{
    timestamps:true
})

const todoSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user:{type: mongoose.Schema.Types.ObjectId, ref='User'},
    name:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'TodoTask' }],
    complete:{
        type: mongoose.Schema.Types.Boolean,
        default: false
    }
},{
    timestamps:true
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

const TodoTask = new mongoose.model('TodoTask', todoSchema)
const Todo = new mongoose.model('Todo', todoSchema)

module.exports = {
    Todo: Todo,
    TodoTask: TodoTask
}