ort mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  priority: String,
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
