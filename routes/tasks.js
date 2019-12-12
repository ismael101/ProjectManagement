const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) => {
    res.status(200).json('loud and clear')
})

router.get('/:id',(req,res,next) => {
    res.status(200).json(req.params.id)
})

router.post('/',(req,res,next) => {
    res.status(200).json(req.body)
})

router.delete('/:id',(req,res,next) => {
    res.status(200).json(req.params.id)
})

module.exports = router