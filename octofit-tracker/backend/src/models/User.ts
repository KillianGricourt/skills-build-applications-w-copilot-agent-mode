import { model, Schema, Types } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  team: { type: Types.ObjectId, ref: 'Team' },
}, { timestamps: true });

export default model('User', userSchema);