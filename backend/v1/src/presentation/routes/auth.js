const express=require('express')
const router=express.Router()
const authController=require('../controllers/auth')

router.route('/sign-up').post(authController.validateUser,authController.signUp)
router.route('/verify-email/:emailToken').get(authController.verifyEmail)
router.route('/sign-in').post(authController.signIn)

module.exports=router