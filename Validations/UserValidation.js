const {body} = require('express-validator')
const users = require('../Models/UsersModel')

const userValidation = ()=>{
    return[
        body("firstname").notEmpty().withMessage("Plz , Enter your first name"),

        body("lastname").notEmpty().withMessage("Plz , Enter your last name"),

        body("email").notEmpty().withMessage("Plz , Enter your email"),
        body("email").isEmail().withMessage("Plz, Enter Valid Email"),
        body("email").custom( async (data)=>{

            const user = await users.findOne({email : data , verified : true})
            if(user){
                throw("this Email is alrady exist")
            }
 
        }),

        body("password").notEmpty().withMessage("Plz , Enter your password")
        .isStrongPassword().withMessage("Plz, Write Strong password"),

        body("phonenumber").notEmpty().withMessage("Plz , Enter your phonenumber")
        .isMobilePhone().withMessage("plz, Enter valid Phone number"),

        body("gender").notEmpty().withMessage("plz , Enter your gender"),

    ]
}

module.exports = userValidation