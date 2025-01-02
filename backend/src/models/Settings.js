import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  general: {
    siteName: String,
    supportEmail: String,
    phoneNumber: String,
    address: String
  },
  delivery: {
    minOrderAmount: Number,
    freeDeliveryAmount: Number,
    deliveryPrice: Number,
    maxDeliveryDistance: Number
  },
  notifications: {
    emailNotifications: Boolean,
    smsNotifications: Boolean,
    orderStatusUpdates: Boolean,
    marketingEmails: Boolean
  },
  maintenance: {
    maintenanceMode: Boolean,
    maintenanceMessage: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Settings', settingsSchema);