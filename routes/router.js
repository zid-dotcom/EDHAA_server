const admincontrollers=require('../controllers/admincontrollers')
const jwtmiddleware=require('../middlewares/jwtmiddleware')

const express=require('express')
const upload = require('../middlewares/multer')

const router=express.Router()


router.post('/adminlogin',admincontrollers.AdminLogin)
router.post('/add',jwtmiddleware,upload.single('image'),admincontrollers.addNews)
router.delete('/delete/:id',jwtmiddleware,admincontrollers.deleteNews)
router.get('/get',admincontrollers.getNews)
router.put('/update/:id',jwtmiddleware,upload.single('image'),admincontrollers.updateNews)



router.post('/activity/add', jwtmiddleware, upload.single('image'), admincontrollers.addActivity)
router.get('/activity/get', admincontrollers.getActivity)
router.put('/activity/update/:id', jwtmiddleware, upload.single('image'), admincontrollers.updateActivity)
router.delete('/activity/delete/:id', jwtmiddleware, admincontrollers.deleteActivity)

router.post('/academic/add', jwtmiddleware, upload.single('image'), admincontrollers.addAcademic)
router.get('/academic/get', admincontrollers.getAcademic)
router.put('/academic/update/:id', jwtmiddleware, upload.single('image'), admincontrollers.updateAcademic)
router.delete('/academic/delete/:id', jwtmiddleware, admincontrollers.deleteAcademic)



module.exports=router
