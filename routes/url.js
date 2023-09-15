const express=require("express");
const { handelGenerateNewShortUrl, handelgetAnalytics } = require("../controllers/url");
const router=express.Router()

router.post("/",handelGenerateNewShortUrl)

router.get("/analytics/:shortId",handelgetAnalytics)


module.exports=router