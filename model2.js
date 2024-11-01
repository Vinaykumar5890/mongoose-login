const mongoose = require("mongoose");

const Order = new mongoose.Schema(
  {
    userId: {
      type:String,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Ensures at least one item is ordered
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true }, // Optional: Contact number for delivery
    },
    paymentDetails: {
      paymentMethod: { 
        type: String, 
        enum: ["COD", "Credit Card", "Debit Card", "PayPal", "Razorpay", "PhonePe"], 
        required: true 
      },
      paymentStatus: { 
        type: String, 
        enum: ["Pending", "Completed", "Failed"], 
        default: "Pending" 
      },
      transactionId: { type: String }, // Optional: Track online payment transactions
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0, // Ensure the total is not negative
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Canceled"],
      default: "Pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    estimatedDelivery: {
      type: Date,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt timestamps
);

// Create the Order model
module.exports = mongoose.model("Order", Order);
