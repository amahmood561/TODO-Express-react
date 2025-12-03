import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { fetchCategories } from './features/categories/categoriesSlice';
import { fetchTodos } from './features/todo/todosSlice';
import { FiltersBar } from './features/filters/FiltersBar';
import { TodosPage } from './features/todo/TodosPage';
import type { RootState } from './store';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.filters);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTodos(filters));
  }, [dispatch, filters]);

  return (
    <div className="app">
      <h1>Todo App</h1>
      <FiltersBar />
      <TodosPage />
    </div>
  );
};

export default App;
