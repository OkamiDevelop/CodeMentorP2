// src/components/TaskForm.js

import React, { useState } from 'react';


function TaskForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [deadline, setDeadline] = useState(task?.deadline || new Date().toISOString().slice(0, 16));

  const handleSave = () => {
    if (!title.trim()) {
      alert('Title is required.');
      return;
    }

    if (new Date(deadline) <= new Date()) {
      alert('Deadline must be in the future.');
      return;
    }

    onSave({ ...task, title, description, deadline, status: task?.status || 'pending' });
  };

  return (
    <div className="TaskForm">
      <h2>{task ? 'Edit Task' : 'New Task'}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button onClick={handleSave}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default TaskForm;
