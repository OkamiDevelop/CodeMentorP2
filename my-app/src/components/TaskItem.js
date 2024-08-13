// src/components/TaskItem.js

import React from 'react';

function TaskItem({ task, onEdit, onDelete, onComplete }) {
  return (
    <div className={`TaskItem ${task.status}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Deadline: {new Date(task.deadline).toLocaleString()}</p>
      <div className="actions">
        {task.status !== 'completed' && (
          <button onClick={() => onComplete(task.id)}>Complete</button>
        )}
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
