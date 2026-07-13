import { buildApp } from './app';
import { envConfig } from './common/configs';

const PORT = envConfig.PORT;

const bootstrap = async () => {
  const app = await buildApp();

  try {
    await app.listen({
      port: PORT,
      host: '0.0.0.0',
    });

    console.log(`🚀 Server running at http://localhost:${PORT}`);
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
