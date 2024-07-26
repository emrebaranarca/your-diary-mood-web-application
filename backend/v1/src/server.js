const app=require('./app')
const serverConfig=require('./config/server')
serverConfig()

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT} PORT`);
})
