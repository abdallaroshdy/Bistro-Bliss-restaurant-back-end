const {body} = require('express-validator')

const validator = ()=>{
    return[
        body('subject').notEmpty().withMessage("Plz , Enter subject"),
        body('message').notEmpty().withMessage("Plz , Enter message")
    ]
}

module.exports = validator