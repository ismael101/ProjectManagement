const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())


app.use((req,res,next) => {
    res.status(404).send('Not Found')
})

app.use((err,req,res) => {
    console.error(err.stack)
    res.status(500).send('Server Error')
})