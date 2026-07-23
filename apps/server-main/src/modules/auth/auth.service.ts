import { type FastifyRequest, type FastifyReply } from 'fastify';

import { ResponseCode } from '@repo/shared-schemas/constants';
import type { ApiSuccessWithResult } from '@repo/shared-schemas/schemas';
import {
  ApiError,
  responseWithResult,
  responseSingle,
} from '@repo/shared-utils/api';
import { AuthApi } from './auth.api';
import {
  loginResponseSchema,
  type LoginResponseDto,
  type LoginRequestDto,
} from './schemas';
import { setToken, removeToken } from '@/common/api/token';

const loginAndRefresh = (
  res: ApiSuccessWithResult<LoginResponseDto>,
  reply: FastifyReply,
) => {
  const validation = loginResponseSchema.safeParse(res);
  if (!validation.success) {
    console.error(validation.error);
    throw new ApiError(
      ResponseCode.VALIDATION_ERROR.code,
      ResponseCode.VALIDATION_ERROR.message,
    );
  }
  const result = validation.data;

  const { accessToken, refreshToken, refreshTokenExpiresAtMs, ...clientRes } =
    result;

  setToken(accessToken, 'ACCESS', reply);
  setToken(refreshToken, 'REFRESH', reply);

  return clientRes;
};

export const AuthService = {
  login: (body: LoginRequestDto, req: FastifyRequest, reply: FastifyReply) =>
    responseWithResult(async () => {
      const res = await AuthApi.login(body, req);

      if (!res?.result) {
        throw new ApiError(
          ResponseCode.INTERNAL_SERVER_ERROR.code,
          ResponseCode.INTERNAL_SERVER_ERROR.message,
        );
      }

      return loginAndRefresh(res, reply);
    }),

  refresh: (req: FastifyRequest, reply: FastifyReply) =>
    responseWithResult(async () => {
      const res = await AuthApi.refresh(req);

      if (!res?.result) {
        throw new ApiError(
          ResponseCode.INTERNAL_SERVER_ERROR.code,
          ResponseCode.INTERNAL_SERVER_ERROR.message,
        );
      }

      return loginAndRefresh(res, reply);
    }),

  logout: (reply: FastifyReply) =>
    responseSingle(async () => {
      removeToken(reply);
    }),
} as const;
