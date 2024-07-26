const authService=require('../../business/services/auth')
const httpStatus=require('http-status')
const validateSchema=require('../middlewares/validateSchema')
const userValidation=require('../../business/validations/user')
const validateJWT=require('../middlewares/validateJWT')
const SignInDTO = require('../../business/DTOs/SignInDto')

const signUp=async(req,res)=>{
    try {
        const userData=req.body
        console.log(req.file);
        const user=await authService.registerUser(userData)
        res.status(httpStatus.CREATED)
        .json({
            message:'user registered successfully',
            user
        })
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST)
        .json({
            message:error.message
        })
    }

} 

const verifyEmail=async(req,res)=>{
    try {
        const {emailToken}=req.params
        await authService.verifyEmail(emailToken)
        res.status(httpStatus.OK)
        .json({
            message:'user verified'
        })
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST)
        .json({
            message:error.message
        })
    }
}

const signIn=async(req,res)=>{
    try {
        const {error,value}=SignInDTO.validate(req.body)
        if(error){
            return res.status(httpStatus.BAD_REQUEST)
            .json({
                message:error.message
            })
        }
        const signInDTO=new SignInDTO(value.email,value.password)
        const accessToken=await authService.loginUser(signInDTO)
        res.status(httpStatus.OK)
        .json(
            {"accessToken":accessToken}
        )
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST)
        .json({
            message:error.message
        })

    }
}

module.exports={
    signUp,
    validateUser:validateSchema(userValidation),
    verifyEmail,
    signIn
}