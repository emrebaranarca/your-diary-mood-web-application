const authRepository=require('../../data/repositories/auth')
const bcrypt=require('bcrypt')
const crypto=require('crypto')
const sendVerificationEmail=require('../../scripts/utils/mail/sendVerificationEmail')
const httpStatus = require('http-status')
const {generateJWT}=require('../../scripts/utils/jwt/jwt')

const registerUser=async(userData)=>{
    try {
        const email=userData.email
        const emailToken=await crypto.randomBytes(12).toString('hex');
        userData.emailToken=emailToken
        const verificationLink = `http://localhost:3000/api/v1/verify-email/${emailToken}`
        sendVerificationEmail(email,verificationLink)
        const salt=await bcrypt.genSalt()
        const hashedPassword=await bcrypt.hash(userData.password,salt)
        userData.password=hashedPassword
        await authRepository.createUser(userData)
    } catch (error) {
        throw new Error(error.message)
    }
}

const verifyEmail=async(emailToken)=>{
    try {
        if(!emailToken){
            throw new Error('email token is null')
        }
        const user=await authRepository.verifyEmail(emailToken)
    } catch (error) {
        throw new Error(error.message)
    }
}

const loginUser=async(userData)=>{
    try {
        const {password}=userData
        const user=await authRepository.loginUser(userData)
        if(!user){
            throw new Error("User Does Not Exists")
        }
        if(!user.isVerified){
            throw new Error("Please Verify Your Account")
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            throw new Error("Invalid Credentials")
        }
        const token = generateJWT(user);
        return token
    } catch (error) {
        throw new Error(error.message)
    }

}

module.exports={
    registerUser,
    verifyEmail,
    loginUser
}