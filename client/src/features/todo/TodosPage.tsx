import React from 'react';
import { useAppSelector } from '../../store';
import { selectTodos, selectTodosLoading, selectTodosError } from './todosSlice';
import { TodoList } from './TodoList';
import { TodoForm } from './TodoForm';

export const TodosPage: React.FC = () => {
  const todos = useAppSelector(selectTodos);
  const loading = useAppSelector(selectTodosLoading);
  const error = useAppSelector(selectTodosError);

  return (
    <div>
      <TodoForm />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TodoList todos={todos} />
    </div>
  );
};
