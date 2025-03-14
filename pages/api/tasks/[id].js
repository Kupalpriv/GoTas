import connectDB from '../../../lib/mongodb';
import Task from '../../../models/Task';

export default async function handler(req, res) {
    await connectDB(); // Connect to MongoDB

    const { id } = req.query;

    if (req.method === 'GET') {
        const task = await Task.findById(id);
        return res.status(200).json(task);
    } 
    
    if (req.method === 'PUT') {
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(updatedTask);
    }

    if (req.method === 'DELETE') {
        await Task.findByIdAndDelete(id);
        return res.status(204).end();
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
