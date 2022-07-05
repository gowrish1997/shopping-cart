const express=require("express");
const app=express();
const dotenv=require('dotenv');
dotenv.config()
const body_parser=require("body-parser")
const mongoose=require('mongoose');
mongoose.Promise=global.Promise
const Authrouter=require('./router/Auth');
const Userrouter=require('./router/User');
const Orderrouter=require('./router/Order')
const Productrouter=require('./router/Product');
const Cartrouter=require('./router/Cart')
const Stirpe=require('./router/Stirpe')
mongoose.connect("mongodb+srv://gowrish:shop@cluster0.4ivxr.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("connected to mongoDB")
})
app.use(body_parser.json())
app.use('/api/user',Userrouter)
app.use('/api/auth',Authrouter)
app.use('/api/product',Productrouter);
app.use('/api/Cart',Cartrouter)
app.use('/api/Order',Orderrouter)
app.use('/api/Checkout',Stirpe)
app.listen(3000)
