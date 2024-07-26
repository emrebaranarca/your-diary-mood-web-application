const express=require('express')
const router=express.Router()

const moodCardController=require('../controllers/moodCard')
const userContoller=require('../controllers/user')

router.route('/create-moodCard').post(userContoller.validateJWT,moodCardController.createMoodCard)
router.route('/get-moodCards').get(userContoller.validateJWT,moodCardController.getMoodCards)
router.route('/delete-moodCard/:id').delete(moodCardController.deleteMoodCard)


module.exports=router