import { type FastifyRequest } from 'fastify';

import type { ApiSuccessWithResult } from '@repo/shared-schemas/src/schemas';
import type { LoginResponseDto, LoginRequestDto } from './schemas';
import { FetchRequest } from '@/common/api';

const { apiPost } = FetchRequest;

export const AuthApi = {
  login: async (body: LoginRequestDto, req: FastifyRequest) =>
    apiPost<ApiSuccessWithResult<LoginResponseDto>>(
      req,
      '/auth/login',
      {},
      body,
    ),
    
  refresh: async (req: FastifyRequest) =>
    apiPost<ApiSuccessWithResult<LoginResponseDto>>(req, '/auth/refresh', {
      authType: 'REFRESH',
    }),
} as const;
