import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const UrlSchema = new mongoose.Schema({
  urlOriginal: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Ingrese una url valida.'],
    maxlength: [150, 'url cannot be more than 150 characters'],
  },
  shortUrl: {
    type: String,
    unique: true,
    default: () => nanoid(7),
    maxlength: [20, 'cannot be more than 20 characters'],
  },
  customUrl: {
    type: String,
    sparse: true,
    unique: true,
    trim: true,
    maxlength: [30, 'cannot be more than 30 characters'],
  },
  clicks: {
    required: true,
    type: Number,
    default: 0,
    min: 0,
  },
});

export default mongoose.models?.Url || mongoose.model('Url', UrlSchema);
