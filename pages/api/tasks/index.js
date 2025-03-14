import connectDB from '../../../lib/mongodb';
import Task from '../../../models/Task';

export default async function handler(req, res) {
    await connectDB(); // Connect to MongoDB

    if (req.method === 'GET') {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
    } 
    
    if (req.method === 'POST') {
        const newTask = new Task(req.body);
        await newTask.save();
        return res.status(201).json(newTask);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
