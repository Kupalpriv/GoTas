import connectDB from '../../../lib/mongodb';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'DELETE') {
    await Task.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Task deleted' });
  }

  if (req.method === 'PUT') {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updatedTask);
  }
}
