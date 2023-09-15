
const shortid=require("shortid")
const url=require("../models/url")
async function handelGenerateNewShortUrl(req,res){
    const body=req.body;
    if(!body.url)return res.status(400).json("url is requierd")
const shortId=shortid();
await url.create({
    shortId:shortId,
    redirectURL:body.url,
    visitHistory:[],
})
return res.json({id:shortId});
}

async  function handelgetAnalytics (req,res){
const shortId=req.params.shortId
const result = await url.findOne({shortId})
return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})

}

module.exports={
    handelGenerateNewShortUrl,
    handelgetAnalytics
}