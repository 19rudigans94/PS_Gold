import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  console: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: String,
  genre: String,
  releaseYear: Number,
  ageRating: String,
  publisher: String,
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  isDigital: {
    type: Boolean,
    default: false
  },
  availableCopies: {
    type: Number,
    default: 0
  },
  totalCopies: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Виртуальное поле для получения количества доступных ключей
gameSchema.virtual('availableKeys').get(async function() {
  const GameKey = mongoose.model('GameKey');
  return await GameKey.countAvailableKeys(this._id);
});

// Метод для проверки доступности цифровой копии
gameSchema.methods.isDigitalCopyAvailable = async function() {
  if (!this.isDigital) return false;
  const availableKeys = await this.availableKeys;
  return availableKeys > 0;
};

// Middleware для автоматического обновления статуса наличия
gameSchema.pre('save', async function(next) {
  if (this.isDigital) {
    const availableKeys = await this.availableKeys;
    this.inStock = availableKeys > 0;
    this.availableCopies = availableKeys;
  }
  next();
});

export default mongoose.model('Game', gameSchema);