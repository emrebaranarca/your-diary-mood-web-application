const httpStatus=require('http-status')
const moodCardService=require('../../business/services/moodCard')

const createMoodCard=async(req,res)=>{
    try {
        const {user}=req.user
        const userID=user.id
        const moodCardData=req.body
        const moodCard=await moodCardService.createMoodCard(moodCardData,userID)
        res.status(httpStatus.CREATED)
        .json(moodCard)
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST)
        .json({
            message:error.message
        })
    }
}

const getMoodCards=async(req,res)=>{
    try {
        const {user}=req.user
        const userID=user.id
        const moodCards=await moodCardService.findMoodCards(userID)
        res.status(httpStatus.OK)
        .json(moodCards)
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST)
        .json({
            message:error.message
        })
    }
}

const deleteMoodCard=async(req,res)=>{
    try {
        const cardID=req.params.id
        await moodCardService.deleteMoodCard(cardID)
        res.status(httpStatus.OK)
        .json({
            message:'deleting mood card'
        })
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST)
        .json({
            message:error.message
        })
    }
}



module.exports={
    createMoodCard,
    getMoodCards,
    deleteMoodCard
}