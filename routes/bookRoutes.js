
const express=require("express");
const router=express.Router();
const bookController=require("../controllers/bookController");

const{verifyToken}=require("../middleware/auth");

router.get("/books/new",verifyToken,(req,res)=>{
    res.render("new-book")
});

router.post("/books",verifyToken,bookController.addBook);
router.get("/books",verifyToken,bookController.getBooks);
router.get("/books/:id",verifyToken,bookController.getBooksById);
router.get("/search",bookController.searchBooks);

module.exports=router;