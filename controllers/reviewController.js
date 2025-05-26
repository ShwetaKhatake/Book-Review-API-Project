const Review = require("../models/Review");


exports.submitReview=async(req,res)=>{
    const{id:bookId}=req.params;
    const {rating,comment}=req.body;
    const userId=req.user.id;

    try{
        const existing=await Review.findOne({book:bookId,user:userId});
        if(existing){
            return res.status(400).send("You already reviewed this book")
        }
        const review=new Review({
            rating,
            comment,
            book:bookId,
            user:userId
        })
        await review.save();
        res.redirect(`/books`)
    }catch(err){
        console.error(err);
        res.status(500).send("Server error")
    }

}

exports.updateReview=async(req,res)=>{
    try{
        
        const review=await Review.findById(req.params.id);
        if(!review){
            return res.status(404).send("Review not found");
        }
        if(review.user.toString()!==req.user.id){
            return res.status(403).send("Unauthorized");
        }
       
            const{rating,comment}=req.body;
            review.rating=rating || review.rating;
            review.comment=comment|| review.comment;
            await review.save();
            res.redirect(`/books/${review.book}`);
        
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
}


exports.deleteReview=async(req,res)=>{
    try{
        const review=await Review.findById(req.params.id);
        if(!review){
            return res.status(404).send("Review not found");

        }
        if(review.user.toString() !==req.user.id){
            return res.status(403).send("Unauthorized");
        }
        await review.deleteOne();
        res.redirect(`/books/${review.book}`)
    }catch(err){
        console.error(err);
        res.status(500).send("server error");
    }
}