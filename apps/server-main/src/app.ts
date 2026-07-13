import Fastify from 'fastify';
import cors from '@fastify/cors';

import { envConfig } from './common/configs';

const CLIENT_URL = envConfig.CLIENT_URL;

export const buildApp = async () => {
  const app = Fastify();

  app.register(cors, {
    origin: CLIENT_URL,
  });

  app.ready((err) => {
    if (err) throw err;
  });

  return app;
};
