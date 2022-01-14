// add middlewares here related to actions
const Action = require('./actions-model')

function checkIdLegit(req, res, next) {
    Action.get(req.params.id)
        .then(action=> {
            if(action) {
                req.action = action
                next()
            } else {
                next({status: 404, message: 'Error!' })
            }
        })
        .catch(err=> {
            next(err)
        })
}

function checkBody (req, res, next) {
    const {notes, description} = req.body
    if(!notes || !description || req.body.completed === undefined) {
        res.status(400).json({message: 'missing body info'})
    } else {
        next()
    }
}


module.exports = {
checkIdLegit,
checkBody

}