const {setUser, getUserSessionId } = require("../service/auth");

async function restrictoLoginUserOnly (req,res,next){
    const userUId=await req.cookies?.uid;
    
    if(!userUId){
       return  res.redirect("/login")
    }
   
    const user= getUserSessionId(userUId);
    if(!user){
       
       return  res.redirect("/login")
    }
    

    req.user=user;

    next();
}

async function checkAuth(req,res,next){
    const userUId=await req.cookies?.uid;
    
    
    const user=await getUserSessionId(userUId);
   
    req.user=user;
    next();
}

module.exports={
    restrictoLoginUserOnly,
    checkAuth
}