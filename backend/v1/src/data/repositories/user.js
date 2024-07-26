const User=require('../models/user')

const uploadProfilePicture=async(userID,filePath)=>{
    try {
        await User.findOneAndUpdate(
            { _id: userID },
            { profilePicture: filePath }
        );
    } catch (error) {
        throw new Error('User update failed');
    }
}

const readUserInfo=async(userID)=>{
    try {
        const user=await User.findById(userID)
        return user
    } catch (error) {
        throw new Error('User update failed')
    }
}


module.exports={
    uploadProfilePicture,
    readUserInfo
}