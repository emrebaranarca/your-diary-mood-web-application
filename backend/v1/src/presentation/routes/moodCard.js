const express=require('express')
const router=express.Router()

const validateJWT=require('../middlewares/validateJWT')
const moodCardController=require('../controllers/moodCard')
const userContoller=require('../controllers/user')

router.route('/create-moodCard').post(validateJWT,moodCardController.createMoodCard)
router.route('/get-moodCards').get(validateJWT,moodCardController.getMoodCards)
router.route('/delete-moodCard/:id').delete(moodCardController.deleteMoodCard)


module.exports=router