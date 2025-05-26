const mongoose=require("mongoose");

const reviewSchema=new mongoose.Schema({
    rating:{
        type:Number,
        required:true,
        min:1,
        Max:5

    },
    comment:{
        type:String,
    },

    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },},{timestamps:true})

    reviewSchema.index({book:1,user:1},{unique:true});

    module.exports=mongoose.model("Review",reviewSchema);