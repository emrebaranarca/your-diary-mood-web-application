const mongoose=require('mongoose')

const moodCardSchema=new mongoose.Schema({
    feel:{
        type:String,
        required:true
    },
    note:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    emoji:{
        type:String,
        required:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    
},{
    versionKey:false
})

module.exports=mongoose.model('MoodCard',moodCardSchema)