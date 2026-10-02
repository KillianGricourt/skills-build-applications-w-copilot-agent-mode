import { model, Schema, Types } from 'mongoose';

const leaderboardSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User' },
  team: { type: Types.ObjectId, ref: 'Team' },
  points: { type: Number, required: true, default: 0, min: 0 },
  period: { type: String, trim: true },
}, { timestamps: true });

export default model('Leaderboard', leaderboardSchema);