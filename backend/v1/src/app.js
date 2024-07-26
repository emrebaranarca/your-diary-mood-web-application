const express=require('express')
const app=express()
const router=require('./presentation/routes')
const fileUpload=require('express-fileupload')
const cors=require('cors')
const path=require('path')

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use('/uploads', express.static(path.join(__dirname,'/uploads')))// uploads dizinini statik olarak sun

app.use('/api/v1',router.userRouter)
app.use('/api/v1',router.authRouter)
app.use('/api/v1/moodCard',router.moodCardRouter)




module.exports=app