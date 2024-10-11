const {validationResult} = require('express-validator')
const Contacts= require('../Models/ContactModel')
const handler = require('../Utilities/ErrorHandler')
const resMSG = require('../Utilities/responceMsg')
const jwd = require('jsonwebtoken')

const addContactMSG = async (req,res)=>{
    

    try{

        const error = validationResult(req)
        if(!error.isEmpty()){
            throw(error)
        }

        const token = req.cookies?.jwd
        // console.log(token);
        let decoded = jwd.verify(token, process.env.JWDKEY);
        // console.log(decoded);

        let name = decoded.firstname +' '+ decoded.lastname

        await Contacts.create({...req.body , email : decoded.email , name : name})

        res.status(200).json({
            status : resMSG.success,
            data : "Added successfully"
        })
    
    }catch(err){
        handler(res,err)
    }
}

const getAllContactMSG = async(req,res)=>{
    try{

        const data = await Contacts.find()
        
        res.status(200).json({
            status : resMSG.success,
            data:data
        }) 

    }catch(err){
        handler(res,err)
    }
}


module.exports = {
    addContactMSG,
    getAllContactMSG
}