import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TodoStatusFilter, TodoSortBy, SortOrder } from '../types/index';

interface FiltersState {
  status: TodoStatusFilter;
  sortBy: TodoSortBy;
  order: SortOrder;
  categoryId: string | null;
}

const initialState: FiltersState = {
  status: 'all',
  sortBy: 'createdAt',
  order: 'asc',
  categoryId: null
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<TodoStatusFilter>) {
      state.status = action.payload;
    },
    setSortBy(state, action: PayloadAction<TodoSortBy>) {
      state.sortBy = action.payload;
    },
    setOrder(state, action: PayloadAction<SortOrder>) {
      state.order = action.payload;
    },
    setCategoryId(state, action: PayloadAction<string | null>) {
      state.categoryId = action.payload;
    }
  }
});

export const { setStatus, setSortBy, setOrder, setCategoryId } = filtersSlice.actions;
export default filtersSlice.reducer;
