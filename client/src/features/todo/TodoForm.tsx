import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { createTodo } from './todosSlice';
import { selectCategories } from '../categories/categoriesSlice';

export const TodoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(
      createTodo({
        title: title.trim(),
        description: description.trim() || undefined,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        categoryId: categoryId || null,
        completed: false,
        createdAt: '', // backend will override
        updatedAt: ''  // backend will override
      } as any)
    );

    setTitle('');
    setDescription('');
    setDueDate('');
    setCategoryId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Todo title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <select
        value={categoryId}
        onChange={e => setCategoryId(e.target.value)}
      >
        <option value="">No category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
};
