const jwt=require('jsonwebtoken')
require('dotenv').config()
const httpStatus=require('http-status')

const generateJWT=(user)=>{
    if(!user){
        res.status(httpStatus.BAD_REQUEST)
        throw new Error("Please Provide User Details")
    }
    const accessToken=jwt.sign(
        {
            user:{
                id:user._id,
                email:user.email,
                username:user.username,
            }

        },
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    )

    return accessToken
}

const verifyToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
};
  
  module.exports = { generateJWT, verifyToken };