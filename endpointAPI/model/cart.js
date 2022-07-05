const mongoose = require("mongoose");
const CartSchmema = new mongoose.Schema(
  {
    userId: {
      type: String,
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
      },
    ],
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("cart", CartSchmema);
