import React from 'react';
import type { Todo } from '../types/index';
import { useAppSelector } from '../../store';
import { selectCategories } from '../categories/categoriesSlice';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const categories = useAppSelector(selectCategories);

  const groups: Record<string, Todo[]> = {};
  todos.forEach(todo => {
    const key = todo.categoryId || 'uncategorized';
    if (!groups[key]) groups[key] = [];
    groups[key].push(todo);
  });

  return (
    <div>
      {Object.entries(groups).map(([categoryId, groupTodos]) => {
        const categoryName =
          categoryId === 'uncategorized'
            ? 'Uncategorized'
            : categories.find(c => c.id === categoryId)?.name || 'Unknown';
        return (
          <div key={categoryId} className="category-group">
            <h3>{categoryName}</h3>
            {groupTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        );
      })}
    </div>
  );
};
