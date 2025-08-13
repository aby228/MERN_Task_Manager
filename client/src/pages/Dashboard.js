// Dashboard: CRUD for personal tasks scoped to the authenticated user
import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';

import { toast } from 'react-toastify';

import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  // Read tasks owned by the current user
  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');

      setTasks(res.data);
    } catch (err) {
      toast.error('Failed to fetch tasks.');

      console.error(err);
    }
  };

  // Create a new task, then refresh the list
  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/tasks', {
        title: newTaskTitle,
        description: newTaskDescription,
      });

      setNewTaskTitle('');

      setNewTaskDescription('');

      toast.success('Task created successfully!');

      fetchTasks();
    } catch (err) {
      toast.error('Failed to create task.');

      console.error(err);
    }
  };

  // Toggle completion status for a specific task
  const handleUpdateTask = async (id, completed) => {
    try {
      await axios.put(`/api/tasks/${id}`, { completed });

      toast.success('Task updated successfully!');

      fetchTasks();
    } catch (err) {
      toast.error('Failed to update task.');

      console.error(err);
    }
  };

  // Remove a task permanently
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);

      toast.success('Task deleted successfully!');

      fetchTasks();
    } catch (err) {
      toast.error('Failed to delete task.');

      console.error(err);
    }
  };

  return (
    <div>
      <h2>Welcome, {user ? user.username : 'Guest'}!</h2>

      <h3>Your Tasks</h3>

      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="New Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description (optional)"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.title}: {task.description}
            </span>

            <button onClick={() => handleUpdateTask(task._id, !task.completed)}>
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>

            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
