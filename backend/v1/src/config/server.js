const dotenv=require('dotenv')
const connectDB=require('./db')

const serverConfig=()=>{
    dotenv.config()
    connectDB()
}

module.exports=serverConfig