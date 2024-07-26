const User=require('../models/user')

const createUser=async(userData)=>{
    try {
        const exitingUser=await User.findOne({
            $or:[
                {email:userData.email},
                {username:userData.username}
            ]
        })

        if(exitingUser){
            throw new Error('Email or username already exists')
        }
        const user=new User(userData)
        await user.save()
        return user
    } catch (error) {
        throw new Error(error.message)
    }

}

const verifyEmail=async(emailToken)=>{
    try {
        const user=await User.findOneAndUpdate({emailToken:emailToken},{isVerified:true})
    } catch (error) {
        throw new Error(error.message)
    }
}

const loginUser=async(userData)=>{
    try {
        if(!userData){
            throw new Error('provide user login data ')
        }
        const{email}=userData
        const user=await User.findOne({
            email:email
        })
        return user
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports={
    createUser,
    verifyEmail,
    loginUser
}
