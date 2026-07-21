import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';

import { envConfig } from './common/configs';
import { apiRoutes } from './modules/routes';

const CLIENT_URL = envConfig.CLIENT_URL;

export const buildApp = async () => {
  const app = Fastify();

  app.register(cors, {
    origin: CLIENT_URL,
  });

  app.register(fastifyCookie, {});

  await app.register(apiRoutes, { prefix: '/bff/v1' });

  app.ready((err) => {
    if (err) throw err;
  });

  return app;
};
