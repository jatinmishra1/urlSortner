const sessonIdToUserMap=new Map();

function setUser(id,user){
    sessonIdToUserMap.set(id,user);
}

function getUserSessionId(id){
    return sessonIdToUserMap.get(id)
}

module.exports={
    setUser,getUserSessionId
}