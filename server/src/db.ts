import { Todo, Category } from './types';

export const todos: Todo[] = [];
export const categories: Category[] = [];

// Simple ID generator
export const createId = () => Math.random().toString(36).substring(2, 10);
