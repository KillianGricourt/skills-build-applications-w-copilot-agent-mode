import { model, Schema, Types } from 'mongoose';

const activitySchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true, min: 0 },
  distanceKm: { type: Number, default: 0, min: 0 },
  points: { type: Number, default: 0, min: 0 },
  completedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default model('Activity', activitySchema);