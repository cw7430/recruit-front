import { baseAxiosInstance, ApiError } from '@repo/shared-utils/src/api';
import { ResponseCode } from '@repo/shared-schemas/src/constants';

const BASE_URL = import.meta.env.BASE_URL;

export const axiosInstance = baseAxiosInstance(BASE_URL);

axiosInstance.interceptors.response.use(
  (conf) => {
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
