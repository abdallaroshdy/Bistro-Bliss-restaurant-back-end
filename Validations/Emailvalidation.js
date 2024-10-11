const {body} = require('express-validator')

const emailValidation = ()=>{
    return[
        body('email').notEmpty().withMessage("Plz , Enter email")
        .isEmail().withMessage("Plz , Enter valid email")
    ]
}

module.exports = emailValidation