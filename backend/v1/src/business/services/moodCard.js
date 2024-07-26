const moodCardRepository=require('../../data/repositories/moodCard')
const GetMoodCardDto=require('../DTOs/GetMoodCardDto')

const createMoodCard=async(moodCardData,userID)=>{
    try {
        const moodCard=await moodCardRepository.createMoodCard(moodCardData,userID)
        return moodCard
    } catch (error) {
        throw new Error(error.message)
    }
}

const findMoodCards=async(userID)=>{
    try {
        const moodCards=await moodCardRepository.readMoodCards(userID)
        const getMoodCardDto=[]
        moodCards.map((element)=>{
            let moodCard=new GetMoodCardDto(element.feel,element.note,element._id)
            getMoodCardDto.push(moodCard)
        })
        return getMoodCardDto
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteMoodCard=async(id)=>{
    try {
        await moodCardRepository.deleteMoodCard(id)
    } catch (error) {
        throw new Error(error.message)
    }
}



module.exports={
    createMoodCard,
    findMoodCards,
    deleteMoodCard
}