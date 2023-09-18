const express=require("express");
const urlRoute=require("./routes/url");
const CookieParse=require("cookie-parser")
const staticRoutes=require("./routes/staticRouter")
const userRoutes=require("./routes/user")
const url=require("./models/url")
const { connectToMongoDB } = require("./connect");
const {restrictoLoginUserOnly,checkAuth}=require("./middlewares/auth")
const app=express();
const PORT=8000;
const path=require("path");
const user = require("./models/user");




connectToMongoDB("mongodb+srv://balajimahraaj123:57xzfeR669l4TuKw@cluster0.it1ro8e.mongodb.net/url-project")
.then(()=>{
    console.log("database connected")
})


app.set("view engine","ejs")//this is telling the express that for server-side rendering we will ejs view engine
app.set("views",path.resolve("./views"))//this is we telling express ki jitne bhi views hai na matlab jitne bhi ejs ki files hai
//wo is ./vies folder meh hai 
app.use(express.json())//used for passing json data
app.use(express.urlencoded({extended:false}))//used for passing form data and other
app.use(CookieParse())

// app.get("/",async(req,res)=>{
//     console.log(req.user);
//     const all_urls=await url.find()
//     // console.log(all_urls)
//     return res.render("home",{
//         urls:all_urls
//     })
// })




app.use("/url",restrictoLoginUserOnly,urlRoute)
app.use("/user",userRoutes)
app.use("/",checkAuth,staticRoutes)
app.get("/url/:shortid",async(req,res)=>{
    const shortid=req.params.shortid
    // console.log(shortid)
   
   const entry= await url.findOneAndUpdate({
        shortId,
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    })

    return res.redirect(entry.redirectURL)
    // return res.redirect("http://locahost:8000/")
})

app.listen(PORT,()=>{
    console.log(`server is listinign on ${PORT}`)
})