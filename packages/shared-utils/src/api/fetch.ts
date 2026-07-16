import { ResponseCode } from '@repo/shared-schemas/src/constants';
import { ApiFail } from '@repo/shared-schemas/src/schemas';
import { ApiError } from './api-error';

export type ContentType = 'JSON' | 'FORM';

export const resolveContentType = (contentType?: ContentType) => {
  return contentType === 'FORM' ? undefined : 'application/json';
};

export const resolveQuery = (
  params?: Record<string, string | number | boolean | undefined>,
) => {
  if (!params) return '';

  const cleanParams: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      cleanParams[key] = String(value);
    }
  }

  const searchParams = new URLSearchParams(cleanParams);
  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : '';
};

export const resolveBody = (body?: unknown, contentType?: ContentType) => {
  if (body === undefined || body === null) return undefined;

  if (contentType === 'FORM' || body instanceof FormData) {
    return body as FormData;
  }

  return JSON.stringify(body);
};

export const fetchResponse = async <T>(res: Response): Promise<T> => {
  const isJson = res.headers.get('content-type')?.includes('application/json');

  if (!isJson) {
    if (!res.ok) {
      throw new ApiError(
        ResponseCode.INTERNAL_SERVER_ERROR.code,
        ResponseCode.INTERNAL_SERVER_ERROR.message,
      );
    }
    return null as T;
  }

  const data = await res.json();

  if (!res.ok) {
    const errorData = data as ApiFail;
    throw new ApiError(
      errorData?.code ?? ResponseCode.INTERNAL_SERVER_ERROR.code,
      errorData?.message ?? ResponseCode.INTERNAL_SERVER_ERROR.message,
      errorData?.errors,
    );
  }

  return data as T;
};
