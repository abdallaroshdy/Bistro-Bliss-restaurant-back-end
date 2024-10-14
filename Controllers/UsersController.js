const users = require('../Models/UsersModel')
const userOTPVerifications = require('../Models/UserOTPVerification')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwd = require('jsonwebtoken')
const responseStatus = require('../Utilities/responceMsg')
const errHandler = require('../Utilities/ErrorHandler')
const nodemailer = require('nodemailer');


const checkNormalUser = async (req,res)=>{
    try{
        res.status(200).json({
            status : responseStatus.success,
            data : "success"
        })
    }catch(err){
        errHandler(err)
    }
}

const checkAdmin =async (req,res)=>{
    try{
        res.status(200).json({
            status : responseStatus.success,
            data : "success"
        })
    }catch(err){
        errHandler(err)
    }

}

const register = async (req,res)=>{
    try{
        const verror = validationResult(req)
        if(!verror.isEmpty()){
            
            throw(verror)
        }

        let passEncrypted = await bcrypt.hash(req.body.password , 10 )
        await users.deleteMany({email:req.body.email})
        await users.create({...req.body , password : passEncrypted , verified : false})
        .then((result)=>{

            sendOTPVerification(req.body.email , res)
        })
        // res.status(200).json({
        //     status : responseStatus.success,
        //     data : "register success"
        // })
    }catch(err){
        errHandler(res , err)
    }
}


const login = async (req,res)=>{
    try{
        if( !(req.body.email===process.env.AdminUser && req.body.password===process.env.AdminPassword)){
            const user = await users.findOne({email : req.body.email , verified : true})
            // console.log(req.body.email);
            // console.log(user.email);
            if(!user){
                throw( "Don't have any account?" )
            }
    
            let checkPassword = await bcrypt.compare(req.body.password , user.password)
    
            if(!checkPassword){
                throw( "Enter Password Correctly" )
            }
    
            const token = jwd.sign( {
                firstname : user.firstname,
                lastname : user.lastname,
                email : user.email,
                phonenumber : user.phonenumber,
                gender : user.gender,
                role : "user"
            }, process.env.JWDKEY,{expiresIn : process.env.ExpireToken})
    
            res.status(200).cookie('jwd',token).json({
                status : responseStatus.success,
                data : "Login Successfully"
            })
        }else{
            const token = jwd.sign( {
                role : "admin"
            }, process.env.JWDKEY ,{expiresIn : process.env.ExpireToken})

            res.status(200).cookie('jwd' , token).json({
                status : responseStatus.success,
                data : "Login Successfully as admin"
            })
        }
        

    }catch(err){
        // console.log(err);
        res.status(400).json({
            status : responseStatus.fail
            ,data : err
        })
    }
    
}



const sendOTPVerification = async (email, res) => {
    try {
        nodemailer.debug = true;

        const otp = `${1000 + Math.floor(Math.random() * 9000)}`;

       
        const transporter = nodemailer.createTransport({

            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.FoodEmail,
                pass: process.env.FoodPassword
            }
        });


        const mailOptions = {

            to: email,
            subject: 'Verify Your Email',
            html:  `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
                <h2 style="color: #4CAF50; text-align: center;">Verify Your Email</h2>
                <p style="font-size: 16px; color: #333;">Hello,</p>
                <p style="font-size: 16px; color: #333;">
                    We received a request to verify your email address for our service. Please enter the code below in the app to complete the verification process.
                </p>
                <div style="text-align: center; margin: 30px 0;">
                    <span style="display: inline-block; font-size: 24px; font-weight: bold; background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px;">
                        ${otp}
                    </span>
                </div>
                <p style="font-size: 16px; color: #333; text-align: center;">This code <b>expires in 3 minutes</b>.</p>
                <p style="font-size: 14px; color: #888;">If you didn't request this, please ignore this email.</p>
                <footer style="text-align: center; font-size: 12px; color: #888; margin-top: 20px;">
                    &copy; 2024 Bistro-Bliss Restaurant. All rights reserved.
                </footer>
            </div>
            `
        };

        
        await transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("************************");
                throw err;
                
            } else {
                console.log(info);
            }
        });

        
        const otpHashed = await bcrypt.hash(otp, 10);

        await userOTPVerifications.deleteMany({email:email})
        
        await userOTPVerifications.create({
            email: email,
            otp: otpHashed
        });

        
        res.status(200).json({
            status: "Pending",
            data: "Verification OTP email sent"
        });

    } catch (err) {
        console.log("++++++++++++++++++++++++");
        console.error(err);
        
        
        res.status(400).json({
            status: responseStatus.fail,
            msg: "Error sending OTP email",
            data: err.message
        });
    }
};



const verifyotp = async(req,res)=>{

    try{
        const email = req.body.email

        const error = validationResult(req)
        if(!error.isEmpty()){
            throw(error)
        }
        if(!req.body.otp){
            throw("You should Enter otp")
        }

        const otpVerification = await userOTPVerifications.findOne({email:email})

        if(!otpVerification){
            throw("You should Enter valid email")
        }

        
        const check = await bcrypt.compare(`${req.body.otp}` , otpVerification.otp)
        if(check){

            await users.updateOne({email:email} , {verified:true})

            await userOTPVerifications.deleteMany({email:email})

            const expiresAt = otpVerification.expiresAt

            const currentTime = new Date().toISOString(); // Current time in UTC
            const expiresAtUTC = new Date(expiresAt).toISOString(); // Ensure expiresAt is in UTC

            console.log("Expires At (UTC):", expiresAtUTC);
            console.log("Current Time (UTC):", currentTime);
            const bufferMilliseconds = 5000; // 5-second buffer
            if (Date.now() > (new Date(expiresAt).getTime() + bufferMilliseconds)) {
                console.log("Expires At:", new Date(expiresAt));
                console.log("Current Time:", new Date(Date.now()));
                await userOTPVerifications.deleteOne({ email: email });
                throw new Error("This code is expired, please request again.");
            }


            res.status(200).json({
                status:responseStatus.success,
                data : "user email verified successfully"
            })
        }else{
            throw("invalid code , Plz Check your inbox.")
        }

    }catch(err){
        errHandler(res,err)
    }
}


const ResendOTP = async(req,res)=>{
    
    try{

        const email = req.body.email

        const error = validationResult(req)
        if(!error.isEmpty()){
            throw(error)
        }

        await userOTPVerifications.deleteMany({email:email})
        await sendOTPVerification(email,res)

        // res.status(200).json({
        //     status: responseStatus.success,
        //     data: "new OTP was sent, Check your inbox."
        // })


    }catch(err){    
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        errHandler(res,err)
    }
}


module.exports = {
    register,
    login,
    checkNormalUser,
    checkAdmin,
    verifyotp,
    ResendOTP
}