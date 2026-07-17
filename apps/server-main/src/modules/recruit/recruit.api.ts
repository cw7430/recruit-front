import { type FastifyRequest } from 'fastify';

import type {
  ApiSuccessWithResult,
  ApiSuccessSingle,
} from '@repo/shared-schemas/schemas';
import type { RecruitRequestDto, RecruitResponseDto } from './schemas';
import { FetchRequest } from '@/common/api';

const { apiGet, apiPost } = FetchRequest;

export const RecruitApi = {
  getRecruit: async (req: FastifyRequest) =>
    apiGet<ApiSuccessWithResult<RecruitResponseDto>>(req, '/recruit', {
      authType: 'ACCESS',
    }),

  recruitAction: async (body: RecruitRequestDto, req: FastifyRequest) =>
    apiPost<ApiSuccessSingle>(req, '/recruit', { authType: 'ACCESS' }, body),
} as const;
