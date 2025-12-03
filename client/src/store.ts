import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todo/todosSlice';
import filtersReducer from './features/filters/filtersSlice';
import categoriesReducer from './features/categories/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filtersReducer,
    categories: categoriesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for convenience
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
