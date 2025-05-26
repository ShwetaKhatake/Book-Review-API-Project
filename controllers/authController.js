
const User = require("../models/User");

const jwt=require("jsonwebtoken");



//Register new user
exports.signup=async(req,res)=>{
    try{
       const{username,email,password}=req.body;
       const existingUser=await User.findOne({$or:[{email},{username}]});
      if(existingUser){
        return res.render("signup",{error:"Username or Email already exists"});
      }
      const newUser=await User.create({username,email,password});
      res.redirect("/login")
        
    }catch(err){
        console.error("Signup error",err)
    res.render("signup",{error:"Something went wrong"})
    }
}

//Login user
exports.login=async(req,res)=>{
    const{email,password}=req.body;

    try{
        const user=await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.render("login",{error:"Invalid credentials"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token,{httpOnly:true})
        res.redirect("/books")
    }catch(e){
     console.error("Login error",err);
     res.render("login",{error:"Something went wrong.Please try again later"})
    }
}