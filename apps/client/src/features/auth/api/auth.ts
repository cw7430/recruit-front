import { FetchRequest } from '@/common/api';
import { ApiError, responseWithResult } from '@repo/shared-utils/api';
import { ResponseCode } from '@repo/shared-schemas/constants';
import type { ApiSuccessWithResult } from '@repo/shared-schemas/schemas';
import type {
  LoginRequestDto,
  LoginResponseDto,
} from '@/features/auth/schemas';

const { apiPost } = FetchRequest;

export const AuthApi = {
  login: (body: LoginRequestDto) =>
    responseWithResult(async () => {
      const res = await apiPost<ApiSuccessWithResult<LoginResponseDto>>(
        '/auth/login',
        {},
        body,
      );

      if (!res?.result) {
        throw new ApiError(
          ResponseCode.INTERNAL_SERVER_ERROR.code,
          ResponseCode.INTERNAL_SERVER_ERROR.message,
        );
      }

      return res;
    }),

  refresh: () =>
    responseWithResult(async () => {
      const res = await apiPost<ApiSuccessWithResult<LoginResponseDto>>(
        '/auth/refresh',
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
} as const;
