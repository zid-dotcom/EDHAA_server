const admincontrollers=require('../controllers/admincontrollers')
const jwtmiddleware=require('../middlewares/jwtmiddleware')

const express=require('express')
const upload = require('../middlewares/multer')

const router=express.Router()


router.post('/adminlogin',admincontrollers.AdminLogin)
router.post('/add',jwtmiddleware,upload.single('image'),admincontrollers.addNews)
router.delete('/delete/:id',jwtmiddleware,admincontrollers.deleteNews)
router.get('/get',admincontrollers.getNews)




module.exports=router
