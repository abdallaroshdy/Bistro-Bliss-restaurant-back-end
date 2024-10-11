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
    let count = 0 
    try{
        decoded = jwd.verify(token, process.env.JWDKEY); 
        
        
    }catch(err){
        count++
    }

    if(count!=0){
        res.status(401).json({
            status: resmsg.fail ,
            data : "You should login first"
        })
        return
    }


    if(decoded.expiresAt < Date.now()){
        res.status(401).json({
            status: resmsg.fail ,
            data : "Your token time is expired"
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

        if(decoded.expiresAt < Date.now()){
            res.status(401).json({
                status: resmsg.fail ,
                data : "Your token time is expired"
            })
            return
        }

    }
    catch(err){
        res.status(401).json({
            status: resmsg.fail ,
            data : "You can't access this resource , only normal user can access this resource"
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
            data : "You should login first"
        })
        return
    }



    let decoded ; 

    try{
        decoded = jwd.verify(token, process.env.JWDKEY);  

        if("admin" != decoded.role){
            throw("")
        }

        if(decoded.expiresAt < Date.now()){
            res.status(401).json({
                status: resmsg.fail ,
                data : "Your token time is expired"
            })
            return
        }

    }
    catch(err){
        res.status(401).json({
            status: resmsg.fail ,
            data : "You can't access this resource , only admin can access this resource"
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