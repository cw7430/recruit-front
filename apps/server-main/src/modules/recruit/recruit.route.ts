import type { FastifyPluginAsync } from 'fastify';
import { RecruitService } from './recruit.service';
import type { RecruitRequestDto } from './schemas';

export const recruitRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async (req, reply) => {
    const res = await RecruitService.getRecruit(req);
    return reply.send(res);
  });

  app.post<{ Body: RecruitRequestDto }>('/', async (req, reply) => {
    const res = await RecruitService.recruitAction(req.body, req);
    return reply.send(res);
  });
};
