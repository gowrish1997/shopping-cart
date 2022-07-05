const mongoose = require("mongoose");
const OrderSchmema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: {
          type: String,
        },
        size: {
          type: String,
        },
        title: { type: String },
        desc: { type: String, required: true },
        Price: {
          type: Number,
        },
        img: {
          type: String,
          required: true,
        },
        instock: {
          type: Boolean,
          default:true
        },
        Addres:{
          type:Object
        },
        status: {
          type: String,
          default: "pending",
        },
        date:{
          type:Object,
          default:new Date()
        }
        
      },
    ],
    
    
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", OrderSchmema);
