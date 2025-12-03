import { Router, Request, Response } from 'express';
import { categories, createId, todos } from '../db';
import { Category } from '../types';
import { validateCategoryBody } from '../middleware/validate';

const router = Router();

// GET /api/categories
router.get('/', (_req: Request, res: Response) => {
  res.json(categories);
});

// POST /api/categories
router.post('/', validateCategoryBody, (req: Request, res: Response) => {
  const { name } = req.body;

  const now = new Date().toISOString();
  const newCategory: Category = {
    id: createId(),
    name: name.trim(),
    createdAt: now
  };

  categories.push(newCategory);
  res.status(201).json(newCategory);
});

// PUT /api/categories/:id
router.put('/:id', validateCategoryBody, (req: Request, res: Response) => {
  const category = categories.find(c => c.id === req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });

  category.name = req.body.name.trim();
  res.json(category);
});

// DELETE /api/categories/:id
// Option: also null out categoryId on todos
router.delete('/:id', (req: Request, res: Response) => {
  const index = categories.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Category not found' });

  const categoryId = categories[index].id;
  categories.splice(index, 1);

  // Remove category reference from todos
  todos.forEach(t => {
    if (t.categoryId === categoryId) t.categoryId = null;
  });

  res.status(204).send();
});

export default router;
