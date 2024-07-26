const userService=require('../../business/services/user')
const httpStatus=require('http-status')
const validateJWT=require('../middlewares/validateJWT')


const uploadProfilePicture=async(req,res)=>{
    try {
        const {user}=req.user
        const userID=user.id
        const file=req.files.profilePicture
        await userService.uploadProfilePicture(userID,file)
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

const getUser=async(req,res)=>{
    try {
        const {user}=req.user
        const userID=user.id
        const userData=await userService.findUserInfo(userID)
        res.status(httpStatus.OK)
        .json(userData)
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST)
        .json({
            message:error.message
        })
    }
}


module.exports={
    uploadProfilePicture,
    validateJWT,
    getUser
}