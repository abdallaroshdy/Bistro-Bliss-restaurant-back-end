const {body} = require('express-validator')

const validation = ()=>{
    return[
        body('date').notEmpty().withMessage("you should enter date"),
        body('totalPersons').notEmpty().withMessage("you should enter total Person")
        .isNumeric().withMessage("totalPersons is not valid , should be number")
    ]
}

module.exports = validation