const express=require('express')
const router=express.Router()
const userController=require('../controllers/user')

router.route('/upload-profil-picture').post(userController.validateJWT,userController.uploadProfilePicture)
router.route('/get-user').get(userController.validateJWT,userController.getUser)


module.exports=router