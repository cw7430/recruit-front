import { type FastifyRequest } from 'fastify';

import { ResponseCode } from '@repo/shared-schemas/constants';
import {
  ApiError,
  responseWithResult,
  responseSingle,
} from '@repo/shared-utils/api';
import { RecruitApi } from './recruit.api';
import { recruitResponseSchema, type RecruitRequestDto } from './schemas';

export const RecruitService = {
  getRecruit: async (req: FastifyRequest) =>
    responseWithResult(async () => {
      const res = await RecruitApi.getRecruit(req);

      if (!res?.result) {
        throw new ApiError(
          ResponseCode.INTERNAL_SERVER_ERROR.code,
          ResponseCode.INTERNAL_SERVER_ERROR.message,
        );
      }

      const validation = recruitResponseSchema.safeParse(res);
      if (!validation.success) {
        console.error(validation.error);
        throw new ApiError(
          ResponseCode.VALIDATION_ERROR.code,
          ResponseCode.VALIDATION_ERROR.message,
        );
      }

      return validation.data;
    }),

  recruitAction: async (body: RecruitRequestDto, req: FastifyRequest) =>
    responseSingle(async () => {
      const res = await RecruitApi.recruitAction(body, req);

      if (!res) {
        throw new ApiError(
          ResponseCode.INTERNAL_SERVER_ERROR.code,
          ResponseCode.INTERNAL_SERVER_ERROR.message,
        );
      }
    }),
} as const;
