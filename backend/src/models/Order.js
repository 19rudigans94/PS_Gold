import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    type: {
      type: String,
      enum: ['game', 'console'],
      required: true
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'items.type',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    rentalDays: Number
  }],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  },
  delivery: {
    name: String,
    phone: String,
    email: String,
    address: String
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'kaspi'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentDetails: {
    kaspiPaymentId: String,
    paymentUrl: String,
    transactionId: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);