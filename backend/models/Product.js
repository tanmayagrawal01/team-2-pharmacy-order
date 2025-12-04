const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true // Search fast karne ke liye
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['OTC', 'Prescription', 'Wellness'], // OTC = Bina script ke, Prescription = Script jaruri
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0 // Inventory management yahan se hoga
  },
  manufacturer: {
    type: String
  },
  expiryDate: {
    type: Date,
    required: true
  },
  // Innovation Point: Agar ye dawa mehngi hai, to sasti generic dawa ka ID yahan daal sakte ho
  alternatives: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);