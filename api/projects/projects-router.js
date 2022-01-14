// Write your "projects" router here!
const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const {checkIdLegit, checkBody } = require('./projects-middleware')

const Project = require('./projects-model')

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects=> {
            res.status(200).json(projects)
        })
        .catch(err=> {
            next(ReferenceError)
        })
})

router.get('/:id', checkIdLegit, (req, res, next) => {
    res.status(200).json(req.project)
})

router.post('/', checkBody, (req, res, next) => {
    Project.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        next(err)
    })
})

router.put('/:id', checkIdLegit, checkBody, (req, res, next)=> {
    Project.update(req.params.id, req.body)
    .then(project=> {
        res.status(201).json(project)
    })
    .catch(err=> {
        next(err)
    })
})

router.delete('/:id', checkIdLegit, (req, res, next) => {
    Project.remove(req.params.id)
    .then(()=> {
        res.status(204).json({message: 'removed Project'})
    })
    .catch(err=> {
        next(err)
    })
})

router.get('/:id/actions', checkIdLegit, (req, res, next) => {
    Project.getProjectActions(req.params.id)
    .then(actions=> {
        res.status(201).json(actions)
    })
    .catch(err=> {
        next(err)
    })
})

module.exports= router