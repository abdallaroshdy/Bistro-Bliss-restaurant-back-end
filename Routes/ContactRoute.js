const validation = require('../Validations/ContactValidation')
const middlewares = require('../Middlewares/authMiddlewares')
const controller = require('../Controllers/ContactConroller')
const express = require('express')
const router = express.Router()


router.route('/').post(middlewares.NormalUserOnlyMiddleware , validation(),controller.addContactMSG )
.get(middlewares.AdminOnlyMiddleware ,controller.getAllContactMSG )

module.exports = router