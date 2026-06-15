import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { healthRoutes } from './routes/health.routes.js';

export function createApp() {
  const app = new Hono();

  app.use('*', logger());

  app.route('/health', healthRoutes);

  app.get('/', (c) => c.json({ message: 'hono-test-app is running' }));

  return app;
}

export const app = createApp();
