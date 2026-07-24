import { FetchRequest } from '@/common/api';
import {
  ApiError,
  responseSingle,
  responseWithResult,
} from '@repo/shared-utils/api';
import { ResponseCode } from '@repo/shared-schemas/constants';
import type {
  ApiSuccessSingle,
  ApiSuccessWithResult,
} from '@repo/shared-schemas/schemas';
import type {
  RecruitRequestDto,
  RecruitResponseDto,
} from '@/features/recruit/schemas';

const { apiGet, apiPost } = FetchRequest;

export const RecruitApi = {
  getRecruit: () =>
    responseWithResult(async () => {
      const res = await apiGet<ApiSuccessWithResult<RecruitResponseDto>>(
        '/recruit',
        {},
      );

      if (!res?.result) {
        throw new ApiError(
          ResponseCode.INTERNAL_SERVER_ERROR.code,
          ResponseCode.INTERNAL_SERVER_ERROR.message,
        );
      }

      return res;
    }),

  recruitAction: (body: RecruitRequestDto) =>
    responseSingle(async () => {
      const res = await apiPost<ApiSuccessSingle>('/recruit', {}, body);

      if (!res) {
        throw new ApiError(
          ResponseCode.INTERNAL_SERVER_ERROR.code,
          ResponseCode.INTERNAL_SERVER_ERROR.message,
        );
      }
    }),
} as const;
