const {body} = require('express-validator')

const menuValidation = ()=>{
    return[
        body("title").notEmpty().withMessage('plz , Enter Title'),

        body("price").notEmpty().withMessage('plz , Enter price')
        .isFloat().withMessage("You should enter number on price"),

        body("desc").notEmpty().withMessage('plz , Enter describtion of item'),

        body("catigory").notEmpty().withMessage('plz , Enter catigory'),
        
        // body("imgUrl").notEmpty().withMessage('plz , Enter image')
    ]
}


module.exports = menuValidation