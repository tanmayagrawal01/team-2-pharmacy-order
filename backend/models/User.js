const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'], // Custom error message
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    // Regex validation for proper email format
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password should be at least 6 characters'],
    select: false // SUPER IMPORTANT: Ye password ko query results se default hide rakhega
  },
  role: {
    type: String,
    enum: {
      values: ['patient', 'pharmacist', 'delivery_agent', 'admin'],
      message: '{VALUE} is not a valid role'
    },
    default: 'patient'
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Phone number must be valid 10 digits'] // India specific validation
  },
  
  // Structured Address (Better than simple strings)
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    country: { type: String, default: 'India' }
  },

  // Hackathon "Wow" Factor: Location for Live Tracking (Delivery Agent ke liye)
  location: {
    type: {
      type: String, 
      enum: ['Point'], 
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [Longitude, Latitude]
      default: [0, 0]
    }
  },

  // Role Specific Details (Optional fields based on role)
  pharmacistDetails: {
    licenseNumber: { type: String }, // Pharmacist verify karne ke liye
    pharmacyName: { type: String }
  },
  deliveryAgentDetails: {
    vehicleNumber: { type: String },
    isAvailable: { type: Boolean, default: true } // Order assign karne ke liye
  },

  lastLogin: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true 
});

// Optimization: Location par index lagado taaki nearby drivers search fast ho (Future proofing)
userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);