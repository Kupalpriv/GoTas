import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('/api/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    await axios.post('/api/tasks', { title, description });
    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">GoTask - Task Management</h1>

      <div className="mb-4">
        <input type="text" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full" />
        <textarea placeholder="Task description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full mt-2"></textarea>
        <button onClick={addTask} className="bg-blue-500 text-white p-2 mt-2 w-full">Add Task</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border p-2 my-2 flex justify-between">
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white p-1">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
  }
