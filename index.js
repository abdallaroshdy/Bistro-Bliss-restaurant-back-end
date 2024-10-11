const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./Routes/UsersRoute')
const menuRoute = require('./Routes/menuRoute')
const bookATable = require('./Routes/bookTableRoute')
const contactRoute = require('./Routes/ContactRoute')
var cookieParser = require('cookie-parser')
const path = require('node:path')
const app = express()
const env = require('dotenv');
const {createServer} = require('node:http')
const cors = require('cors')

env.config()

const server = createServer(app)

app.listen(process.env.PORT,()=>{
    console.log("Server Started successfully");
})

mongoose.connect(process.env.DB).then( ()=>{

    console.log("DB connected successfully");

})


app.use(cors({
    origin:"http://localhost:4200",
    credentials : true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname , '')))
app.use(cookieParser())
app.use('/user' , userRoute)
app.use('/menu' , menuRoute)
app.use('/bookATable' , bookATable)
app.use('/contact' , contactRoute)

