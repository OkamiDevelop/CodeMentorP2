// src/components/TaskList.js

import React from 'react';
import TaskItem from './TaskItem';
import NoTask from './NoTask';

function TaskList({ tasks, onEdit, onDelete, onComplete }) {
  if (tasks.length === 0) {
    return <NoTask />;
  }

  return (
    <div className="TaskList">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}

export default TaskList;
