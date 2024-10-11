const mongoose = require('mongoose')


const menuSchema = mongoose.Schema({
    
    title : String,
    price : Number,
    desc : String,
    catigory : {type : String , enum : ["Breakfast" , "Main Dish", "Drink", "Dessert"]} ,
    imgUrl : String,
    registeredAt : {type : Date , default:Date.now()}

})

const menuModel = mongoose.model('Menu',menuSchema)

module.exports = menuModel