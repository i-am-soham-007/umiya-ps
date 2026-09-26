import express from 'express';
import path from 'path';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import { initDatabase } from './server/db/database';
import apiRouter from './server/routes/api.router';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize SQLite Database schema & seed default data
  try {
    await initDatabase();
    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Database initialization error:', err);
  }

  app.use(cors());
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // API Routes FIRST
  app.use('/api', apiRouter);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', server: 'UMIYA STUDIO USA API Server', timestamp: new Date().toISOString() });
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`UMIYA STUDIO USA Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
