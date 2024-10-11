const mongoose =require('mongoose')

const Schema = mongoose.Schema({
    email:String,
    otp:String  ,
    createdAt : {type : Date , default : Date.now},
    expiresAt : {type : Date , default :()=> Date.now() + 3 * 60 * 1000}
})

const model = mongoose.model('UserOTPVerification',Schema)

module.exports = model