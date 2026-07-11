import Fastify from 'fastify';

export const buildApp = async () => {
  const app = Fastify();

  app.ready((err) => {
    if (err) throw err;
  });

  return app;
};
