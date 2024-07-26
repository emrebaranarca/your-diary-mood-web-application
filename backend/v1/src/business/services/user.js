const userRepository=require('../../data/repositories/user')
const path=require('path')
const GetUserInfoDto=require('../DTOs/GetUserInfoDto')

const uploadProfilePicture=async(userID,file)=>{
    try {
        if (!file) {
            throw new Error('No file uploaded');
        }
        if(!userID){
            throw new Error('User ID is required');
        }

        const extension=path.extname(file.name)
        const fileName=`${userID}${extension}`
        const folderPath=path.join(__dirname,"../../uploads/userProfileImages",fileName)
        // Move file to the destination directory
        file.mv(folderPath, async (err) => {
            if (err) {
                throw new Error('File upload failed');
            }
            await userRepository.uploadProfilePicture(userID, fileName);
        });
        
    } catch (error) {
        throw new Error(error.message)
    }
}

const findUserInfo=async(userID)=>{
    try {
        const userData=await userRepository.readUserInfo(userID)
        const getUserInfoDto=new GetUserInfoDto(userData.email,userData.username,userData.fullname,userData.profilePicture)
        return getUserInfoDto
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports={
    uploadProfilePicture,
    findUserInfo
}

