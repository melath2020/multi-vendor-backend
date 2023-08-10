const express = require("express");
const path=require('path');
const User = require("../model/user");
const router = express.Router();
const {upload}= require('../multer');
const ErrorHandler = require("../utils/ErrorHandler");

// create user
router.post("/create-user",upload.single("file"),async(req,res,next)=>{
    try{
        const { name, email, password } = req.body;
        const userEmail = await User.findOne({ email });
    
        if (userEmail) {
            return next(new ErrorHandler("User already exists", 400));
          }
    
          const filename=req.file.filename;
          const fileUrl=path.join(filename);
    
          
    
          const user = {
            name: name,
            email: email,
            password: password,
            avatar:fileUrl
          };
    
        const newUser= await User.create(user);
        res.status(201).json({
            success:true,
            newUser
        }) 
      
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
      }
   
})


module.exports = router;