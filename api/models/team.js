const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    team:{type:mongoose.Schema.Types.ObjectId, ref='Team'},
    name:{
        type: mongoose.Schema.Types.String,
        required:true
    },
    title:{
        type: mongoose.Schema.Types.String,
        required:true
    },
    avatar:{
        type: mongoose.Schema.Types.String,
        required:true
    }
},{
    timestamps:true
})

const teamSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    name:{
        type: mongoose.Schema.Types.String,
        required:true
    },
    members:[{type: mongoose.Schema.Types.ObjectId, ref='User'}]
},{
    timestamps:true
})

const User = new mongoose.model('Team', userSchema)
const Team = new mongoose.model('Team', teamSchema)

module.exports = {
    Team: Team,
    User: User
}