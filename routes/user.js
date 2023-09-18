const express=require("express");
const { handelUserSingnUp ,handelUserLogin} = require("../controllers/user");

const  router=express.Router();


router.post("/",handelUserSingnUp)
router.post("/login",handelUserLogin)

module.exports=router;