import express from 'express';
import cors from 'cors';
import todosRouter from './routes/todos';
import categoriesRouter from './routes/categories';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/todos', todosRouter);
app.use('/api/categories', categoriesRouter);

// Error handler last
app.use(errorHandler);

export default app;
