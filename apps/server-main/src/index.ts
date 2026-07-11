import { buildApp } from './app';

const bootstrap = async () => {
  const app = await buildApp();

  try {
    await app.listen({
      port: 3000,
      host: '0.0.0.0',
    });

    console.log(`🚀 Server running at http://localhost:${3000}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

(async () => {
  await bootstrap();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
