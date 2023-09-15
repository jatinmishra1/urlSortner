const express=require("express");
const urlRoute=require("./routes/url");
const url=require("./models/url")
const { connectToMongoDB } = require("./connect");
const app=express();
const PORT=8000;
app.use(express.json())



connectToMongoDB("mongodb+srv://balajimahraaj123:57xzfeR669l4TuKw@cluster0.it1ro8e.mongodb.net/url-project")
.then(()=>{
    console.log("database connected")
})

app.use("/url",urlRoute)
app.get("/:shortid",async(req,res)=>{
    const shortid=req.params.shortid
    console.log(shortid)
   
   const entry= await url.findOneAndUpdate({
        shortId:shortid
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    })
    console.log(entry.redirectURL)
    res.redirect(entry.redirectURL)
})

app.listen(PORT,()=>{
    console.log(`server is listinign on ${PORT}`)
})