const Menu = require('../Models/MenuModel')
const errHandler = require('../Utilities/ErrorHandler')
const resmsg = require('../Utilities/responceMsg')
const {validationResult} = require('express-validator')
const handeler = require('../Utilities/ErrorHandler')
const path = require('node:path')
const fs = require('node:fs')


const deleteImg = (imgUrl)=>{
    const imgPath = path.join(__dirname, '..', imgUrl);

    // console.log(imgPath);

    fs.unlink(imgPath, (err) => {
        if (err) {
            console.error("Error deleting image: ", err);
        }
        // } else {
        //     console.log("Image deleted successfully: ", imgPath);
        // }
    });
}

const getMenu = async(req ,res)=>{
    try{
        const data = await Menu.find()
        res.status(200).json({
            status : resmsg.success,
            data : data
        })
    }catch(err){
        errHandler(res,err)
    }
}



const  addItemOnMenu = async(req ,res)=>{
    try{

        const error = validationResult(req)
        if(!error.isEmpty()){
            throw(error)
        }

        const img = await req.file
        if(!img){
            throw("You should Enter image of Item")
        }
        // console.log(img.mimetype.split('/')[1]);
        const ext = img.mimetype.split('/')[1]

        if(!(ext == 'JPEG' ||ext == 'JPEG'.toLowerCase() ||ext == 'GIF' ||ext == 'GIF'.toLowerCase() ||ext == 'PNG' ||ext == 'PNG'.toLowerCase() ||ext == 'SVG' ||ext == 'SVG'.toLowerCase() )){
            throw('This file is not image , plz Enter image')
        }
        

        await Menu.create({...req.body ,  imgUrl : img.path})

        res.status(201).json({
            status : resmsg.success,
            data : "Item was added successfully"
        })



    }catch(err){
        handeler(res ,err)

        if(req.file){
            deleteImg(req.file.path)
        }
    }
}



const  getSingleItem = async(req ,res)=>{

    try{
        const id = req.params.id
        const item = await Menu.findById(id)

        if(!item){
            throw("this item with this id : "+ id + " is not exist")
        }

        res.status(200).json({
            status : resmsg.success,
            data : item
        })
        

    }catch(err){
        handeler(res ,err)
    }

}

const  updateItemOnMenu= async(req ,res)=>{
    try{
        const id = req.params.id

        const error = validationResult(req)

        if(!error.isEmpty()){
            throw(error)
        }
        const item = await Menu.findById(id)

        if(!item){
            throw("this item with this id : "+ id + " is not exist")
        }

        const imgUrl = item.imgUrl

        // console.log("line 123 imgUrl : " + imgUrl);

        const img = await req.file

        

        let updated = ''
        
        if(!img){

            updated = await Menu.updateOne({_id : id} , {...req.body , imgUrl : imgUrl } , { new: true, runValidators: true })


        }else{
            const ext = img.mimetype.split('/')[1]

            if(!(ext == 'JPEG' ||ext == 'JPEG'.toLowerCase() ||ext == 'GIF' ||ext == 'GIF'.toLowerCase() ||ext == 'PNG' ||ext == 'PNG'.toLowerCase() ||ext == 'SVG' ||ext == 'SVG'.toLowerCase() )){
                throw('This file is not image , plz Enter image')
            }

            updated = await Menu.updateOne({_id : id} , {...req.body , imgUrl : img.path } , { new: true, runValidators: true })
            deleteImg(imgUrl)
        }

        if (updated.matchedCount === 0) {
            throw('Item with this id does not exist');
        }

        res.status(200).json({
            status : resmsg.success,
            data : "Item was updated successfully",
            img : img.path

        })


    }catch(err){

        handeler(res ,err)

        if(req.file){
            deleteImg(req.file.path)
        }
    }
}

const DeleteItemOnMenu = async(req ,res)=>{
    try{

        const id = req.params.id
        const item = await Menu.findById(id)

        if(!item){
            throw("this item with this id : "+ id + " is not exist")
        }

        const imgUrl = item.imgUrl;



        const deleted = await Menu.deleteOne({_id : id})

        if (deleted.deletedCount === 0) {
            throw new Error("Failed to delete item from the database");
        }

        deleteImg(imgUrl)

        res.status(200).json({
            status: resmsg.success,
            data: "Deleted successfully"
        });

    }catch(err){
        handeler(res ,err)
    }
}



module.exports={
    getMenu,         // GOOD
    addItemOnMenu,
    getSingleItem,   // GOOD
    updateItemOnMenu,
    DeleteItemOnMenu // GOOD
}