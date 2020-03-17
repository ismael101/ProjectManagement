const User = require('./user')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new mongoose.Schema({
    _id:{
        type: Schema.Types.ObjectId,
        required:true
    },
    name:{
        type: Schema.Types.String,
        required:true
    },
    members:[{ type: Schema.Types.ObjectId, ref: 'User'}],
},{
    timestamps:true
})

teamSchema.pre('remove', function(next) {
    this.members.forEach(element => {
        User.remove({_id:element})
    });
    next()
})


const Team = new mongoose.model('Team', teamSchema)

module.exports = Team