const responseStatus = require('../Utilities/responceMsg')

const handeler = (res , err)=>{
    
    let Errors = ''

    if(err.message){
        Errors = err.message.split(',')
    }else if(err.errors && err.errors[0].msg){
        Errors = err.errors.map( (singleError) => {
            msg = singleError.msg
            if(msg.msg){
                return msg.msg
            }
            return msg
        } ) 

    }else{
        Errors = [err]
    }

    // console.log(Errors);

    res.status(400).json({
        status : responseStatus.fail,
        data : Errors
    })

}

module.exports = handeler