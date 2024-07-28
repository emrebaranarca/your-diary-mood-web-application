const path=require('path')
const GetUserInfoDto=require('../DTOs/GetUserInfoDto')
const UserRepository = require('../../data/repositories/user')

class UserService{
    constructor(){
        this.userRepository=UserRepository
    }

    uploadProfilePicture=async(userID,file)=>{
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
                await this.userRepository.uploadProfilePicture(userID, fileName);
            });
            
        } catch (error) {
            throw new Error(error.message)
        }
    }

    
    findUserInfo=async(userID)=>{
        try {
            const userData=await this.userRepository.readUserInfo(userID)
            const getUserInfoDto=new GetUserInfoDto(userData.email,userData.username,userData.fullname,userData.profilePicture)
            return getUserInfoDto
        } catch (error) {
            throw new Error(error.message)
        }
    }


}





module.exports=new UserService()

