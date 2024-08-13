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
  const [sortOption, setSortOption] = useState('titleAsc'); // Default sort option


  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), status: 'pending' }]);
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

  const completeTaskFromForm = (updatedTask) => {
    completeTask(updatedTask.id);
    setShowForm(false);
  };

  const sortTasks = (tasks) => {
    switch (sortOption) {
      case 'titleAsc':
        return tasks.sort((a, b) => a.title.localeCompare(b.title));
      case 'titleDesc':
        return tasks.sort((a, b) => b.title.localeCompare(a.title));
      case 'deadlineAsc':
        return tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      case 'deadlineDesc':
        return tasks.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
      default:
        return tasks;
    }
  };
  
  const filterTasks = () => {
    const now = new Date();
    let filteredTasks = [];
  
    switch (activeCategory) {
      case 'Pending':
        filteredTasks = tasks.filter(task => task.status === 'pending' && new Date(task.deadline) > now);
        break;
      case 'Completed':
        filteredTasks = tasks.filter(task => task.status === 'completed');
        break;
      case 'Overdue':
        filteredTasks = tasks.filter(task => task.status === 'pending' && new Date(task.deadline) <= now);
        break;
      default:
        filteredTasks = tasks;
        break;
    }
  
    return sortTasks(filteredTasks);
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
    const now = new Date().getTime();
  
    tasks.forEach(task => {
      if (task.status === 'pending') {
        const deadlineTime = new Date(task.deadline).getTime();
        const timeUntilDeadline = deadlineTime - now;
        const reminderTime = deadlineTime - 600000; // 10 minutes before deadline
  
        console.log(`Task: ${task.title}, Reminder time: ${new Date(reminderTime)}, Current time: ${new Date(now)}`);
  
        if (reminderTime > now && timeUntilDeadline > 0) {
          const timeoutId = setTimeout(() => {
            if (Notification.permission === 'granted') {
              new Notification('Task Reminder', { body: `${task.title} is due soon!` });
              console.log(`Notification sent for task: ${task.title}`);
            }
          }, reminderTime - now);
  
          // Cleanup timeout if the task gets updated or component re-renders
          return () => clearTimeout(timeoutId);
        }
      }
    });
  }, [tasks]);
  

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  return (
    <div className="App">
      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onCategoryClick={handleCategoryClick}
      />
      <div className="task-controls">
        <select onChange={handleSortChange} value={sortOption}>
          <option value="titleAsc">Title (A-Z)</option>
          <option value="titleDesc">Title (Z-A)</option>
          <option value="deadlineAsc">Deadline (Sooner First)</option>
          <option value="deadlineDesc">Deadline (Later First)</option>
        </select>
      </div>
      {showForm ? (
        <TaskForm
          task={editingTask}
          onSave={editingTask ? editTask : addTask}
          onCancel={() => setShowForm(false)}
          onComplete={completeTaskFromForm}
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
