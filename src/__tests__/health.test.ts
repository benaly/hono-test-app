import { describe, it, expect } from 'vitest';
import { createApp } from '../app.js';

describe('GET /health', () => {
  it('returns status ok', async () => {
    const app = createApp();
    const res = await app.request('/health');

    expect(res.status).toBe(200);

    const body = await res.json() as { status: string; timestamp: string };
    expect(body.status).toBe('ok');
    expect(body.timestamp).toBeDefined();
  });
});

describe('GET /', () => {
  it('returns running message', async () => {
    const app = createApp();
    const res = await app.request('/');

    expect(res.status).toBe(200);

    const body = await res.json() as { message: string };
    expect(body.message).toBe('hono-test-app is running');
  });
});
