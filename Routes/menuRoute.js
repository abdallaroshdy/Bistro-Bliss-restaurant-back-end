const express = require('express')
const Router = express.Router()
const menuController = require('../Controllers/menuController')
const menuValidation = require('../Validations/menuValidation')
const uploadImage = require('../Utilities/UploadImgs')
const normalUser = require('../Middlewares/authMiddlewares')


const print = (req,res , next )=>{
    console.log("-***********************************-");
    next()
}

Router.route('/').get(normalUser.userMiddleware , menuController.getMenu)

.post(normalUser.AdminOnlyMiddleware,
uploadImage.single('imgUrl'),menuValidation(),
menuController.addItemOnMenu)



Router.route('/:id').get(normalUser.AdminOnlyMiddleware , menuController.getSingleItem)
.patch( normalUser.AdminOnlyMiddleware ,uploadImage.single('imgUrl')  , menuValidation(),menuController.updateItemOnMenu)
.delete(normalUser.AdminOnlyMiddleware , menuController.DeleteItemOnMenu)

// Router.route('/img/:id').patch(uploadImage.single('imgUrl'),menuController.updateImagOfItem)

module.exports = Router