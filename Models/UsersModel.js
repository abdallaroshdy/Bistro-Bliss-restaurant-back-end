const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstname : {type : String},
    lastname : {type : String},
    email : {type : String},
    password : {type : String},
    phonenumber : {type : String},
    date : {type :Date , default : Date.now},
    gender : {type : String , enum : ['male' , 'female']},
    verified : {type : Boolean , default : false}
})

const Users = mongoose.model('User',UserSchema)

module.exports = Users