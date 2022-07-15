import { createRouter } from '../createRouter';
import test from './test';

export const appRouter = createRouter()
  .merge('test.', test)

export type AppRouter = typeof appRouter;
