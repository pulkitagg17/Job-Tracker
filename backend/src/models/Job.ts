import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  ctc: { type: Number, required: false },
  dateOfDrive: { type: Date, required: false },
  status: { type: String, enum: ['applied', 'interview', 'offer', 'rejected'], default: 'applied' },
  tags: [{ type: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Job = mongoose.model('Job', jobSchema);
