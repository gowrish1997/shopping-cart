const router = require("express").Router();
router.get("/app/usertext",function(req,res){
    res.send("this is get request")
})

router.post("/app/usertext",function(req,res){
    res.send(req.body.name)
})
module.exports=router

