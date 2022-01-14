// add middlewares here related to projects
const Project = require('./projects-model')

function checkIdLegit(req, res, next) {
    Project.get(req.params.id)
        .then(project=> {
            if(project) {
                req.project = project
                next()
            } else {
                next({status: 404, message: 'Error!' })
            }
        })
        .catch(err=> {
            next(err)
        })
}

function checkBody (req, res, next){
    if (!req.body.name || !req.body.description || req.body.completed === undefined){
        res.status(400).json({ message: "missing required field" });
      }
    else(
        next()
      )
}


module.exports = {
    checkIdLegit,
    checkBody,
    
    }
