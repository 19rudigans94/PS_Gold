import mongoose from 'mongoose';

const consoleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  pricePerDay: {
    type: Number,
    required: true
  },
  imageUrl: String,
  condition: {
    type: String,
    enum: ['new', 'excellent', 'good', 'fair'],
    default: 'new'
  },
  serialNumber: String,
  accessories: [String],
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Console', consoleSchema);