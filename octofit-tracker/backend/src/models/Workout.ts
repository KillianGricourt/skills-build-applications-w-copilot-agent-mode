import { model, Schema } from 'mongoose';

const workoutSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category: { type: String, trim: true },
  durationMinutes: { type: Number, min: 0 },
  difficulty: { type: String, enum: ['easy', 'moderate', 'hard'] },
}, { timestamps: true });

export default model('Workout', workoutSchema);