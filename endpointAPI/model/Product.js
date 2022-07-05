const mongoose = require("mongoose");
const ProductSchmema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true
    
  },
  desc: {
    type: String,
    required: true,
    
  },
  img: {
    type: String,
    required:true
  },
categories:{
      type:Array,
      
  },
  size:{
    type:Array,
    
},
color:{
    type:Array,
    
},Price:{
    type:Number,
    
},
  instock:{
    type:Boolean,
    default:true
  }
},


{
    timestamps:true
}
);
module.exports=mongoose.model('Product',ProductSchmema)
