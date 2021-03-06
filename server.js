//import modules
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const projects = require('./routes/project')
const tasks = require('./routes/task')
const app = express()
const path = require('path')

//connect to database
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds023912.mlab.com:23912/projects`,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
        .then(() => {
            console.log('connected to db')
        })
        .catch(err  => {
            console.log(err)
        }) 

app.use(express.static(path.join(__dirname, 'client', 'dist')))

//allow json and cors 
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//endpoints for projects and tasks
app.use('/api/tasks', tasks)
app.use('/api/projects', projects)

app.use(function(req, res, next){
    res.status(404).send('Not found')
})

// Error handler for server errors 
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Server error')
})


// Start server running 
var server = app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port', server.address().port)
})