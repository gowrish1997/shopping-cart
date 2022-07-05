const router=require("express").Router();
const stripe=require('stripe')(process.env.STRIPE_KEY)
router.post("/Postslice",(req,res)=>{
    console.log(req.body)
stripe.charges.create({
    source:req.body.tokenId,
    amount:req.body.amount,
    currency:"usd"
},(stripeErr,stripeRes)=>{
    if(stripeRes){
res.status(200).send(stripeRes)
    }
    else{
        res.send(stripeErr)
    }

})
})
module.exports=router