// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const {checkIdLegit, checkBody } = require('./actions-middlware')
const Action = require('./actions-model')

router.get('/', (req, res, next) => {
    Action.get()
        .then(action=> {
            res.status(200).json(action)
        })
        .catch(err=> {
            next(err)
        })
})

router.get('/:id', checkIdLegit, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', checkBody, (req, res, next)=> {

    Action.insert(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err=> {
            next(err)
        })
})

router.put('/:id', checkIdLegit, checkBody, (req, res, next) => {
    Action.update(req.params.id, req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id', checkIdLegit, (req,res,next) => {
    Action.remove(req.params.id)
        .then (()=> {
            res.status(204).json({message: 'Deleted action'})
        })
        .catch(err=> {
            next(err)
        })
})
module.exports = router