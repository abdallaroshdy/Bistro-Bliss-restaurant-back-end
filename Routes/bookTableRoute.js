
const express = require('express')

const validation = require('../Validations/bookTableValidation')

const router =express.Router()

const controller = require('../Controllers/bookTableController')

const middelware = require('../Middlewares/authMiddlewares')

router.route('/').post( middelware.NormalUserOnlyMiddleware ,validation() , controller.BookingTable)
router.route('/').get( middelware.AdminOnlyMiddleware  , controller.getAllBooks)

module.exports = router