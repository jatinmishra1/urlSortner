const User =require("../models/user")
const {v4:uuidv4}=require("uuid");
const {setUser,getUserSessionId} =require("../service/auth")

async function handelUserSingnUp(req,res){
const {name,email,password}=req.body;
await  User.create({
    name,email,password
})
return res.redirect("/");
}

async function handelUserLogin(req,res){
    const {name,email,password}=req.body;
    const user=await User.findOne({email,password});
    if(!user){
       return  res.render("login",{
           error: "invalid credentials"
        })
    }
    // console.log(user);
    const sessionId=uuidv4();
    // await setUser(sessionId,user); //not needed in  jwt 
    const token=setUser(user)
//    await  res.cookie("uid",sessionId)
    await res.cookie("uid",token);
   return  res.redirect("/")
}

module.exports={handelUserSingnUp,handelUserLogin}