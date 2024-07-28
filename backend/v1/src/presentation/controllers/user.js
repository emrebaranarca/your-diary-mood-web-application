const UserService=require('../../business/services/user')
const httpStatus=require('http-status')
const validateJWT=require('../middlewares/validateJWT')


class UserController{
    constructor() {
        this.userService=UserService
    }
    uploadProfilePicture=async(req,res)=>{
        try {
            const {user}=req.user
            const userID=user.id
            const file=req.files.profilePicture
            await this.userService.uploadProfilePicture(userID,file)
            res.status(httpStatus.OK).json({
                message: 'Profile picture uploaded successfully!'
            });
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({
                message:error.message
            })
        }
    }

    getUser=async(req,res)=>{
        try {
            const {user}=req.user
            const userID=user.id
            const userData=await this.userService.findUserInfo(userID)
            res.status(httpStatus.OK)
            .json(userData)
        } catch (error) {
            res.status(httpStatus.BAD_REQUEST)
            .json({
                message:error.message
            })
        }
    }
    
}

const userController = new UserController();

module.exports = userController;
