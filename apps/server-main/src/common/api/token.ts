import { type FastifyRequest, type FastifyReply } from 'fastify';

import { ApiError } from '@repo/shared-utils/api';
import { ResponseCode } from '@repo/shared-schemas/constants';

export type AuthType = 'ACCESS' | 'REFRESH';

export const getToken = (authType: AuthType, req: FastifyRequest) => {
  let token: string | undefined;

  if (authType === 'ACCESS') {
    token = req.cookies.access_token;
  }

  if (authType === 'REFRESH') {
    token = req.cookies.refresh_token;
  }

  if (!token) {
    throw new ApiError(
      ResponseCode.UNAUTHORIZED.code,
      ResponseCode.UNAUTHORIZED.message,
    );
  }

  return token;
};

export const setToken = (
  token: string,
  authType: AuthType,
  reply: FastifyReply,
) => {
  reply.setCookie(
    authType === 'REFRESH' ? 'refresh_token' : 'access_token',
    token,
    {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
  );
};

export const removeToken = (reply: FastifyReply) => {
  reply.clearCookie('access_token');
  reply.clearCookie('refresh_token');
};
