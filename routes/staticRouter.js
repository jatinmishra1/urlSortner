const express=require("express");
const url = require("../models/url");
const router=express.Router()

router.get("/",async(req,res)=>{
    if(!req.user){
        return res.redirect("/login")
    }
    
  
    const all_urls=await url.find({createdBy:req.user._id})
    console.log("hum")
    console.log(req.user._id)
    console.log(all_urls)
    // console.log("static ke home me")
    return res.render("home",{
        urls:all_urls
    })
})

router.get("/signup",(req,res)=>{
    return res.render("signup")
})

router.get("/login",(req,res)=>{
    return res.render("login")
})

module.exports=router