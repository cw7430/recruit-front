import type { FastifyPluginAsync } from 'fastify';
import { AuthService } from './auth.service';
import type { LoginRequestDto } from './schemas';

export const authRoutes: FastifyPluginAsync = async (app) => {
  app.post<{ Body: LoginRequestDto }>('/login', async (req, reply) => {
    const res = await AuthService.login(req.body, req, reply);
    return reply.send(res);
  });

  app.post('/refresh', async (req, reply) => {
    const res = await AuthService.refresh(req, reply);
    return reply.send(res);
  });

  app.post('/logout', async (_req, reply) => {
    const res = await AuthService.logout(reply);
    return reply.send(res);
  });
};
