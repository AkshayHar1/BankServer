 const mongoose=require('mongoose')

 const userSchema=new mongoose.Schema({
    acno:Number,
    psw:String,
    uname:String,
    balance:Number,
    transcations:[]

 })

 const users=new mongoose.model("users",userSchema)

 module.exports=users;