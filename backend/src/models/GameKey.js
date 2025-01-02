import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const gameKeySchema = new mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  is_sold: {
    type: Boolean,
    default: false
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  reservedAt: {
    type: Date,
    default: null
  },
  reservedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  reservationExpires: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Хешируем пароль перед сохранением
gameKeySchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Статический метод для подсчета доступных ключей
gameKeySchema.statics.countAvailableKeys = async function(gameId) {
  return await this.countDocuments({
    game: gameId,
    is_sold: false,
    reservedAt: null
  });
};

// Метод для резервирования ключа
gameKeySchema.statics.reserveKey = async function(gameId, userId) {
  const reservationDuration = 15 * 60 * 1000; // 15 минут
  
  const key = await this.findOneAndUpdate(
    {
      game: gameId,
      is_sold: false,
      reservedAt: null
    },
    {
      reservedBy: userId,
      reservedAt: new Date(),
      reservationExpires: new Date(Date.now() + reservationDuration)
    },
    { new: true }
  );

  if (!key) {
    throw new Error('Нет доступных ключей');
  }

  return key;
};

// Метод для подтверждения покупки ключа
gameKeySchema.statics.confirmPurchase = async function(keyId, userId) {
  const key = await this.findOneAndUpdate(
    {
      _id: keyId,
      reservedBy: userId,
      is_sold: false,
      reservationExpires: { $gt: new Date() }
    },
    {
      is_sold: true,
      buyer: userId,
      reservedAt: null,
      reservedBy: null,
      reservationExpires: null
    },
    { new: true }
  );

  if (!key) {
    throw new Error('Ключ не найден или резервация истекла');
  }

  return key;
};

// Метод для отмены резервации
gameKeySchema.statics.cancelReservation = async function(keyId) {
  return await this.findOneAndUpdate(
    { _id: keyId },
    {
      reservedBy: null,
      reservedAt: null,
      reservationExpires: null
    },
    { new: true }
  );
};

// Метод для очистки просроченных резерваций
gameKeySchema.statics.clearExpiredReservations = async function() {
  return await this.updateMany(
    {
      reservationExpires: { $lt: new Date() },
      is_sold: false
    },
    {
      reservedBy: null,
      reservedAt: null,
      reservationExpires: null
    }
  );
};

const GameKey = mongoose.model('GameKey', gameKeySchema);

export default GameKey;
