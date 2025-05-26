
const express=require("express");
const router=express.Router();
const {verifyToken}=require("../middleware/auth");
const reviewController=require("../controllers/reviewController");

router.post("/books/:id/reviews",verifyToken,reviewController.submitReview);
router.put("/reviews/:id",verifyToken,reviewController.updateReview);
router.delete("/reviews/:id",verifyToken,reviewController.deleteReview);


module.exports=router;