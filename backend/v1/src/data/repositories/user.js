const User=require('../models/user')
class UserRepository{

    uploadProfilePicture=async(userID,filePath)=>{
        try {
            await User.findOneAndUpdate(
                { _id: userID },
                { profilePicture: filePath }
            );
        } catch (error) {
            throw new Error('User update failed');
        }
    }

    readUserInfo=async(userID)=>{
        try {
            const user=await User.findById(userID)
            return user
        } catch (error) {
            throw new Error('User update failed')
        }
    }

    
}

module.exports=new UserRepository()