export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate?: string | null;
  categoryId?: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TodoStatusFilter = 'all' | 'active' | 'completed';
export type TodoSortBy = 'createdAt' | 'dueDate';
export type SortOrder = 'asc' | 'desc';
