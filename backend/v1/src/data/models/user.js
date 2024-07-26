const mongoose=require('mongoose') 

const userSchema = new mongoose.Schema({
  fullname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  profilePicture:{
    type:String,
    required:false
  },
  isVerified:{
    type:Boolean,
    required:true,
    default:false
  },
  emailToken:{
    type:String,
    required:false
  }
},{
  timestamps:true,
  versionKey:false
});


module.exports=mongoose.model('User',userSchema)