
const Book=require("../models/Book");
const Review=require("../models/Review");

exports.addBook=async(req,res)=>{
try{
    const{title,author,genre,publishedYear}=req.body;

    const book=new Book({
        title,
        author,
        genre,
        publishedYear,
        createdBy:req.user.id
    })
    await book.save();
    res.redirect("/books")
}catch(err){
    console.error("Error adding book",err);
    res.status(500).send("Server error")
}
}

exports.getBooks=async(req,res)=>{
    try{
        const{page=1,limit=10,author="",genre=""}=req.query;

        const filter={};
        if(author) filter.author=author;
        if(genre) filter.genre=genre;

        const books=await Book.find(filter)
        .populate("createdBy","username")
        .skip((page-1)*limit)
        .limit(parseInt(limit));

        const total=await Book.countDocuments(filter);
        res.render("books",{
            books,
            totalPages:Math.ceil(total/limit),
            page:parseInt(page),
            filters:{author,genre}

        })

    }catch(err){
        console.error("Error fetching books",err);
        res.status(500).json({message:"Server error while fetching books"});
    }
}

exports.getBooksById=async(req,res)=>{
    try{
        const book=await Book.findById(req.params.id).populate("createdBy","username");
        if(!book) return res.status(404).send("Book not found")
        const reviews=await Review.find({book:book._id}).populate("user","username").sort({createdAt:-1});
        res.render("book",{book,reviews,user:req.user || null,token:req.cookies.token||null});
    }catch(err){
        console.error(err);
        res.status(500).send("Server error")
    }
}

exports.searchBooks=async(req,res)=>{
    try{
        const{q}=req.query;
        if(!q){
            return res.render("search-results",{books:[],query:""});
        }

        const regex=new RegExp(q,"i");
        const books=await Book.find({
            $or:[
                {title:regex},
                {author:regex}
            ]
        }).populate("createdBy","username")
        res.render("search-results",{books,query:q});
    }catch(err){
        console.error(err);
        res.status(500).send("Server error")
    }
}