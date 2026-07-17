import { type FastifyRequest } from 'fastify';

import {
  fetchResponse,
  resolveBody,
  resolveQuery,
  resolveContentType,
  type ContentType,
  type QueryValue,
} from '@repo/shared-utils/api';
import { envConfig } from '@/common/configs';
import { getToken, type AuthType } from './token';

const BASE_URL = envConfig.INTERNAL_URL;

interface FetchOptions extends RequestInit {
  authType?: AuthType | 'NONE';
  contentType?: ContentType;
}

const serverFetch = async <T>(
  req: FastifyRequest,
  endPoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  const { authType = 'NONE', contentType = 'JSON', ...init } = options;

  const bearerToken = authType === 'NONE' ? null : getToken(authType, req);
  const contentOptions = resolveContentType(contentType);

  const res = await fetch(`${BASE_URL}/${endPoint}`, {
    ...init,
    headers: {
      ...(contentOptions && { 'Content-Type': contentOptions }),
      ...(bearerToken && { Authorization: `Bearer ${bearerToken}` }),
      ...init?.headers,
    },
  });

  return fetchResponse(res);
};

export const FetchRequest = {
  apiGet: async <T>(
    req: FastifyRequest,
    endPoint: string,
    options?: Omit<FetchOptions, 'contentType'>,
    params?: Record<string, QueryValue>,
  ): Promise<T> => {
    const query = resolveQuery(params);

    return serverFetch<T>(req, `${endPoint}${query}`, {
      method: 'GET',
      ...options,
    });
  },

  apiPost: async <T, B = unknown>(
    req: FastifyRequest,
    endPoint: string,
    options?: FetchOptions,
    body?: B | FormData,
  ): Promise<T> => {
    return serverFetch<T>(req, endPoint, {
      method: 'POST',
      ...options,
      ...(body !== undefined && {
        body: resolveBody(body, options?.contentType),
      }),
    });
  },

  apiPut: async <T, B = unknown>(
    req: FastifyRequest,
    endPoint: string,
    options?: FetchOptions,
    body?: B | FormData,
  ): Promise<T> => {
    return serverFetch<T>(req, endPoint, {
      method: 'PUT',
      ...options,
      ...(body !== undefined && {
        body: resolveBody(body, options?.contentType),
      }),
    });
  },

  apiPatch: async <T, B = unknown>(
    req: FastifyRequest,
    endPoint: string,
    options?: FetchOptions,
    body?: B | FormData,
  ): Promise<T> => {
    return serverFetch<T>(req, endPoint, {
      method: 'PATCH',
      ...options,
      ...(body !== undefined && {
        body: resolveBody(body, options?.contentType),
      }),
    });
  },

  apiDelete: async <T = void>(
    req: FastifyRequest,
    endPoint: string,
    options?: Omit<FetchOptions, 'contentType'>,
  ): Promise<T> => {
    return serverFetch<T>(req, endPoint, {
      method: 'DELETE',
      ...options,
    });
  },
} as const;
