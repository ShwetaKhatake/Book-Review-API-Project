
const mongoose=require("mongoose");
 const bookSchema=new mongoose.Schema({
    title:String,
    author:String,
    genre:String,
    publishedYear:Number,
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
 })
 module.exports=mongoose.model("Book",bookSchema);
