
const express =require("express");
const dotenv=require("dotenv");
const authRoutes=require("./routes/authRoutes");
const bookRoutes=require("./routes/bookRoutes");
const reviewRoutes=require("./routes/reviewRoutes");
const connectDB=require("./config/db");
const cookieParser=require("cookie-parser");
const path=require("path");
const methodOverride=require("method-override");


dotenv.config();
connectDB();

const app=express();


app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use("/",authRoutes)
app.use("/",bookRoutes)
app.use("/",reviewRoutes);

const PORT=process.env.PORT || 8080;

app.use(express.json());




    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    })
