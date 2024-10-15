const jwd  = require('jsonwebtoken')
const resmsg = require('../Utilities/responceMsg')

const userMiddleware = (req ,res ,next)=>{

    const token = req.cookies?.jwd
    // console.log(req.cookies);
    if(!token){
        res.status(401).json({
            status: resmsg.fail ,
            data : "You should login first"
        })
        return
    }

    let decoded ;  
    try{
 
        decoded = jwd.verify(token, process.env.JWDKEY); 
        
    }catch(err){
        // console.log(err);

        let data = "You should login first"

        if(err.name && err.name  === "TokenExpiredError"){
            data = err.message
        }
        
        res.status(401).clearCookie("jwd").json({
            status: resmsg.fail ,
            data : data 
        })
        return
    }

    next()
}

const NormalUserOnlyMiddleware = (req ,res ,next)=>{
    const token = req.cookies?.jwd
    // console.log(req.cookies);
    // console.log(token);
    if(!token){
        res.status(401).json({
            status: resmsg.fail ,
            data : "You should login first"
        })
        return
    }



    let decoded ; 

    try{
        decoded = jwd.verify(token, process.env.JWDKEY);  

        if("user" != decoded.role){
            throw("")
        }

    }catch(err){
        // console.log(err);

        let data = "You should login first"

        if(err.name && err.name  === "TokenExpiredError"){
            data = err.message
        }
        
        res.status(401).clearCookie("jwd").json({
            status: resmsg.fail ,
            data : data 
        })
        return
    }

    
 
    next()
}

const AdminOnlyMiddleware = (req ,res ,next)=>{
    const token = req.cookies?.jwd
    // console.log(req.cookies);
    // console.log(token);
    if(!token){
        res.status(401).json({
            status: resmsg.fail ,
            data : "You should login first",
            abdallaMSG : "first "
        })
        return
    }



    let decoded ; 

    try{
        decoded = jwd.verify(token, process.env.JWDKEY);  

        if("admin" != decoded.role){
            throw("")
        }

    }catch(err){
        // console.log(err);

        let data = "You should login first as admin"

        if(err.name && err.name  === "TokenExpiredError"){
            data = err.message
        }
        
        res.status(401).json({ //.clearCookie("jwd")
            status: resmsg.fail ,
            data : data ,
            abdallaMSG : {
                "1" : "2" , err
            }
        })
        return
    }
 
    next()
}




module.exports = {
    userMiddleware
    ,AdminOnlyMiddleware,
    NormalUserOnlyMiddleware
}