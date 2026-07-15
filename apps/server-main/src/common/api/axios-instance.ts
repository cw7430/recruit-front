import { type FastifyRequest } from 'fastify';

import { envConfig } from '@/common/configs';
import { baseAxiosInstance, ApiError } from '@repo/shared-utils/src/api';
import { ResponseCode } from '@repo/shared-schemas/src/constants';
import { getToken, type AuthType } from './token';

type Options = {
  AuthType: 'NONE' | AuthType;
};

const BASE_URL = envConfig.INTERNAL_URL;

const axiosInstance = baseAxiosInstance(BASE_URL);

export const buildAxios = (options: Options, req: FastifyRequest) => {
  axiosInstance.interceptors.request.use(
    (conf) => {
      if (options.AuthType === 'NONE') {
        return conf;
      }

      const token = getToken(options.AuthType, req);
      conf.headers.Authorization = `Bearer ${token}`;

      return conf;
    },
    (err) => {
      const res = err.response?.data;

      if (res?.code && res?.message) {
        return Promise.reject(new ApiError(res.code, res.message));
      }

      console.error('Axios Error:', err);
      return Promise.reject(
        new ApiError(
          ResponseCode.INTERNAL_SERVER_ERROR.code,
          ResponseCode.INTERNAL_SERVER_ERROR.message,
        ),
      );
    },
  );
};
