const sessonIdToUserMap=new Map();//ye state maintain kr ne ke liye tha par ab to state chaiye hi nhi as we will use jwt
const jwt =require("jsonwebtoken")
//jwt is stateless authentication
const secret="hwdhihfibfih4898r78479"
function setUser(user){
    const payload={
       
        ...user,

    }
    return jwt.sign({
        _id:user._id,
        email:user.email
    },secret)

    // sessonIdToUserMap.set(id,user);
}

function getUserSessionId(token){
    // return sessonIdToUserMap.get(id)
    if(!token)return null;
    return jwt.verify(token,secret)
}

module.exports={
    setUser,getUserSessionId
}