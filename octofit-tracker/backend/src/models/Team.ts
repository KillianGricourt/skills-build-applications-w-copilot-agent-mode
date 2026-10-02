import { model, Schema, Types } from 'mongoose';

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  members: [{ type: Types.ObjectId, ref: 'User' }],
  points: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

export default model('Team', teamSchema);