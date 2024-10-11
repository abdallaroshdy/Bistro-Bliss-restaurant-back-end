const bookATable = require('../Models/BookTable')

const {validationResult} = require('express-validator')

const errHandler = require('../Utilities/ErrorHandler')

const jwd  = require('jsonwebtoken')
const resmsg = require('../Utilities/responceMsg')


const BookingTable = async (req,res)=>{

    try{

        // console.log(req.body.totalPersons);
        const error = validationResult(req)
        if(!error.isEmpty()){
            throw(error)
        }

        
        const token = req.cookies?.jwd
        let decoded = jwd.verify(token, process.env.JWDKEY);
        // console.log(decoded);
        
        await bookATable.create({...req.body , ...decoded})

        res.status(200).json({
            status : resmsg.success,
            data : "Added successfully"
        })

    
    }catch(err){
        errHandler(res,err)
    }
}


const getAllBooks = async(req,res)=>{

    try{

        const data = await bookATable.find()

        res.status(200).json({
            status:resmsg.success,
            data : data
        })

    }catch(err){
        errHandler(res,err)
    }
}

module.exports = {
    BookingTable,
    getAllBooks
}