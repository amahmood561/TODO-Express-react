import { Router, Request, Response } from 'express';
import { todos, createId, categories } from '../db';
import { Todo, TodoStatusFilter, TodoSortBy, SortOrder } from '../types';
import { validateTodoBody } from '../middleware/validate';

const router = Router();

// GET /api/todos?status=all|active|completed&sortBy=createdAt|dueDate&order=asc|desc&categoryId=...
router.get('/', (req: Request, res: Response) => {
  const status = (req.query.status as TodoStatusFilter) || 'all';
  const sortBy = (req.query.sortBy as TodoSortBy) || 'createdAt';
  const order = (req.query.order as SortOrder) || 'asc';
  const categoryId = req.query.categoryId as string | undefined;

  let result = [...todos];

  if (status === 'active') {
    result = result.filter(t => !t.completed);
  } else if (status === 'completed') {
    result = result.filter(t => t.completed);
  }

  if (categoryId) {
    result = result.filter(t => t.categoryId === categoryId);
  }

  result.sort((a, b) => {
    const av = a[sortBy] || '';
    const bv = b[sortBy] || '';
    if (av < bv) return order === 'asc' ? -1 : 1;
    if (av > bv) return order === 'asc' ? 1 : -1;
    return 0;
  });

  res.json(result);
});

// GET /api/todos/:id
router.get('/:id', (req: Request, res: Response) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

// POST /api/todos
router.post('/', validateTodoBody, (req: Request, res: Response) => {
  const { title, description, dueDate, categoryId } = req.body;

  if (categoryId && !categories.find(c => c.id === categoryId)) {
    return res.status(400).json({ message: 'Invalid categoryId' });
  }

  const now = new Date().toISOString();
  const newTodo: Todo = {
    id: createId(),
    title: title.trim(),
    description: description?.trim(),
    dueDate: dueDate || null,
    categoryId: categoryId || null,
    completed: false,
    createdAt: now,
    updatedAt: now
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /api/todos/:id
router.put('/:id', validateTodoBody, (req: Request, res: Response) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  const { title, description, dueDate, categoryId, completed } = req.body;

  if (categoryId && !categories.find(c => c.id === categoryId)) {
    return res.status(400).json({ message: 'Invalid categoryId' });
  }

  todo.title = title.trim();
  todo.description = description?.trim();
  todo.dueDate = dueDate || null;
  todo.categoryId = categoryId || null;
  if (typeof completed === 'boolean') {
    todo.completed = completed;
  }
  todo.updatedAt = new Date().toISOString();

  res.json(todo);
});

// PATCH /api/todos/:id/toggle
router.patch('/:id/toggle', (req: Request, res: Response) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  todo.completed = !todo.completed;
  todo.updatedAt = new Date().toISOString();

  res.json(todo);
});

// DELETE /api/todos/:id
router.delete('/:id', (req: Request, res: Response) => {
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Todo not found' });

  todos.splice(index, 1);
  res.status(204).send();
});

export default router;
