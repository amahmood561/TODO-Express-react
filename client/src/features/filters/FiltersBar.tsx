import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setStatus, setSortBy, setOrder, setCategoryId } from './filtersSlice';
import { selectCategories } from '../categories/categoriesSlice';

export const FiltersBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.filters);
  const categories = useAppSelector(selectCategories);

  return (
    <div className="filters">
      <select
        value={filters.status}
        onChange={e => dispatch(setStatus(e.target.value as any))}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={filters.sortBy}
        onChange={e => dispatch(setSortBy(e.target.value as any))}
      >
        <option value="createdAt">Created date</option>
        <option value="dueDate">Due date</option>
      </select>

      <select
        value={filters.order}
        onChange={e => dispatch(setOrder(e.target.value as any))}
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>

      <select
        value={filters.categoryId || ''}
        onChange={e => dispatch(setCategoryId(e.target.value || null))}
      >
        <option value="">All categories</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
    </div>
  );
};
