const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MONGODB connected")
    }catch(e){
        console.error("Db connection failed",e.message);

    }
};
module.exports=connectDB;