const multer = require('multer')

const storag = multer.diskStorage({
    destination : (req, file , rc)=>{
        rc(null , './Uploads')
    },

    filename : (req , file , rc)=>{
        // console.log(file);
        let name = Date.now()+'-'+Math.round(Math.random()*100000) + '.' + file.mimetype.split('/')[1]
        // console.log(name);
        rc(null , name)
    }
})

const upload = multer({storage : storag})

module.exports = upload