import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/client';
import type { RootState } from '../../store';
import type { Category } from '../types/index';

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null
};

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchAll',
  async () => {
    return api.get<Category[]>('/categories');
  }
);

export const createCategory = createAsyncThunk<Category, { name: string }>(
  'categories/create',
  async (payload) => {
    return api.post<Category>('/categories', payload);
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load categories';
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export const selectCategories = (state: RootState) => state.categories.items;
export default categoriesSlice.reducer;
