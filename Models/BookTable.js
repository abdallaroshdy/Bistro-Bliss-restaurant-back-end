const mongoose = require('mongoose')

const schema = mongoose.Schema({
    email : String , 
    phonenumber : String,
    date : Date ,
    totalPersons :Number
})

const bookTables = mongoose.model('Book' , schema)

module.exports = bookTables