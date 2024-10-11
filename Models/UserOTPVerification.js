const mongoose =require('mongoose')

const Schema = mongoose.Schema({
    email:String,
    otp:String  ,
    createdAt : {type : Date , default : Date.now},
    expiresAt : {type : Date , default : Date.now() + 60 * 5000}
})

const model = mongoose.model('UserOTPVerification',Schema)

module.exports = model