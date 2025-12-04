const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String, // S3 ya Cloudinary ka URL yahan aayega
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  // Pharmacist verification ke liye
  pharmacistNotes: {
    type: String // Reason for rejection (e.g., "Date expired", "Blurry image")
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Pharmacist ki ID jisne approve kiya
  },
  // Agar AI/OCR use kar rahe ho to text yahan store kar sakte ho
  extractedText: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);