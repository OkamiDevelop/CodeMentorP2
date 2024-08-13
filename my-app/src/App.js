// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Pending');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
    setShowForm(false);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTask(null);
    setShowForm(false);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const completeTask = (taskId) => {
    setTasks(tasks.map(task => (task.id === taskId ? { ...task, status: 'completed' } : task)));
  };

  const filterTasks = () => {
    const now = new Date();
    switch (activeCategory) {
      case 'Pending':
        return tasks.filter(task => task.status === 'pending' && new Date(task.deadline) > now);
      case 'Completed':
        return tasks.filter(task => task.status === 'completed');
      case 'Overdue':
        return tasks.filter(task => task.status === 'pending' && new Date(task.deadline) <= now);
      default:
        return tasks;
    }
  };

  const handleAddClick = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleCategoryClick = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  useEffect(() => {
    tasks.forEach(task => {
      const timeUntilDeadline = new Date(task.deadline).getTime() - new Date().getTime();
      if (task.status === 'pending' && timeUntilDeadline <= 600000 && timeUntilDeadline > 0) {
        setTimeout(() => {
          if (Notification.permission === 'granted') {
            new Notification('Task Reminder', { body: `${task.title} is due soon!` });
          }
        }, timeUntilDeadline - 600000);
      }
    });
  }, [tasks]);
  

  return (
    <div className="App">
      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onCategoryClick={handleCategoryClick} // Pass the function to handle category click
      />
      {showForm ? (
        <TaskForm
          task={editingTask}
          onSave={editingTask ? editTask : addTask}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <TaskList
          tasks={filterTasks()}
          onEdit={(task) => {
            setEditingTask(task);
            setShowForm(true);
          }}
          onDelete={deleteTask}
          onComplete={completeTask}
        />
      )}
      <Footer onAdd={handleAddClick} />
    </div>
  );
}

export default App;
