const MoodCard=require('../models/moodCard')

const createMoodCard=async(moodCardData,userID)=>{
    try {
        const moodCard=new MoodCard(moodCardData)
        moodCard.user=userID
        await moodCard.save()
        return moodCard
    } catch (error) {
        throw new Error(error.message)
    } 
}

const readMoodCards=async(userID)=>{
    try {
        const moodCards=await MoodCard.find({
            user:userID
        })
        return moodCards
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteMoodCard=async(id)=>{
    try {
        await MoodCard.findByIdAndDelete(id)
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports={
    createMoodCard,
    readMoodCards,
    deleteMoodCard
}