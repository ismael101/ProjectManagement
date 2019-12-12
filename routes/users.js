const express = require('express')
const router = express.Router()

router.post('/login',(req,res,next) => {
    res.status(200).json('logged in')
})

router.post('/signup',(req,res,next) => {
    res.status(200).json('signed up')
})

module.exports = router