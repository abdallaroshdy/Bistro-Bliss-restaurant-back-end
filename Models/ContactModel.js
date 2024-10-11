const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    email:String,
    subject:String,
    message:String,
    date:{type : Date , default : Date.now()}
})  

const model = mongoose.model('Contact' , schema)    

module.exports = model