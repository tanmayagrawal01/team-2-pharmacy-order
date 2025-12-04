const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Agar order prescription wala hai, to link karo
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    priceAtPurchase: { // Price change ho sakti hai, isliye order ke time ka price fix rakho
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['verification_pending', 'processing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'processing'
  },
  deliveryAddress: {
    street: String,
    city: String,
    zip: String
  },
  // Delivery Agent Assignment
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Delivery boy ki ID
  },
  deliveryCode: {
    type: String // Secure Handover ke liye OTP (Optional innovation)
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);