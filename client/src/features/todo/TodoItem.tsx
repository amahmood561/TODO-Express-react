import React, { useState } from 'react';
import type { Todo } from '../types/index';
import { useAppDispatch } from '../../store';
import { toggleTodo, deleteTodo, updateTodo } from './todosSlice';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleSave = () => {
    dispatch(updateTodo({ id: todo.id, data: { title } }));
    setEditing(false);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
      />
      {editing ? (
        <>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
          {todo.dueDate && <span> (due {new Date(todo.dueDate).toLocaleDateString()})</span>}
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
    </div>
  );
};
