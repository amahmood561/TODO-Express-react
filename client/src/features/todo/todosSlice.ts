import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api/client';
import type { RootState } from '../../store';
import type { Todo, TodoStatusFilter, TodoSortBy, SortOrder } from '../types/index';

interface TodosState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  loading: false,
  error: null
};

interface FetchTodosArgs {
  status: TodoStatusFilter;
  sortBy: TodoSortBy;
  order: SortOrder;
  categoryId: string | null;
}

export const fetchTodos = createAsyncThunk<Todo[], FetchTodosArgs>(
  'todos/fetchAll',
  async ({ status, sortBy, order, categoryId }) => {
    const params = new URLSearchParams();
    params.set('status', status);
    params.set('sortBy', sortBy);
    params.set('order', order);
    if (categoryId) params.set('categoryId', categoryId);

    return api.get<Todo[]>(`/todos?${params.toString()}`);
  }
);

export const createTodo = createAsyncThunk<Todo, Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>(
  'todos/create',
  async (payload) => {
    return api.post<Todo>('/todos', payload);
  }
);

export const updateTodo = createAsyncThunk<
  Todo,
  { id: string; data: Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>> }
>('todos/update', async ({ id, data }) => {
  return api.put<Todo>(`/todos/${id}`, data);
});

export const toggleTodo = createAsyncThunk<Todo, string>(
  'todos/toggle',
  async (id) => {
    return api.patch<Todo>(`/todos/${id}/toggle`);
  }
);

export const deleteTodo = createAsyncThunk<string, string>(
  'todos/delete',
  async (id) => {
    await api.delete(`/todos/${id}`);
    return id;
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Optional local-only reducers if you want
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load todos';
      })
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const idx = state.items.findIndex((t: Todo) => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(toggleTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const idx = state.items.findIndex((t: Todo) => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((t: Todo) => t.id !== action.payload);
      });
  }
});

export const selectTodos = (state: RootState) => state.todos.items;
export const selectTodosLoading = (state: RootState) => state.todos.loading;
export const selectTodosError = (state: RootState) => state.todos.error;

export default todosSlice.reducer;
