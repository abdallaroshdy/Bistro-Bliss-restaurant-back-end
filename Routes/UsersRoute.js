const userController = require('../Controllers/UsersController')
const express = require('express')
const userValidation = require('../Validations/UserValidation')
const normalUser = require('../Middlewares/authMiddlewares')
const emailValidation = require('../Validations/Emailvalidation')
const Router = express.Router()


Router.route('/register').post(  userValidation() , userController.register)
Router.route('/login').post( userController.login)


Router.route('/verifyotp').post(emailValidation(), userController.verifyotp)
Router.route('/ResendOTP').post(emailValidation(), userController.ResendOTP)

Router.route('/check').get(normalUser.userMiddleware , userController.checkNormalUser)
Router.route('/checkAdmin').get(normalUser.AdminOnlyMiddleware , userController.checkAdmin)
Router.route('/checkNormalUser').get(normalUser.NormalUserOnlyMiddleware , userController.checkNormalUser)



module.exports =Router