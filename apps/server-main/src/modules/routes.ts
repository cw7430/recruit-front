import type { FastifyPluginAsync } from 'fastify';

import { authRoutes } from './auth/auth.route';
import { recruitRoutes } from './recruit/recruit.route';

export const apiRoutes: FastifyPluginAsync = async (app) => {
  await app.register(authRoutes, { prefix: '/auth' });
  await app.register(recruitRoutes, { prefix: '/recruit' });
};
