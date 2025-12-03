import { Request, Response, NextFunction } from 'express';

export const validateTodoBody = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, dueDate, categoryId, completed } = req.body;

  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ message: 'Title is required and must be a non-empty string.' });
  }

  if (description && typeof description !== 'string') {
    return res.status(400).json({ message: 'Description must be a string.' });
  }

  if (dueDate && Number.isNaN(Date.parse(dueDate))) {
    return res.status(400).json({ message: 'dueDate must be a valid ISO date string.' });
  }

  if (categoryId && typeof categoryId !== 'string') {
    return res.status(400).json({ message: 'categoryId must be a string.' });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'completed must be a boolean.' });
  }

  next();
};

export const validateCategoryBody = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ message: 'Category name is required.' });
  }
  next();
};
