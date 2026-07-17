import {
  fetchResponse,
  resolveBody,
  resolveQuery,
  resolveContentType,
  type ContentType,
  type QueryValue,
} from '@repo/shared-utils/api';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/bff/v1';
interface FetchOptions extends RequestInit {
  contentType?: ContentType;
}

const clientFetch = async <T>(
  endPoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  const { contentType = 'JSON', ...init } = options;

  const contentOptions = resolveContentType(contentType);

  const res = await fetch(`${BASE_URL}/${endPoint}`, {
    ...init,
    credentials: 'include',
    headers: {
      ...(contentOptions && { 'Content-Type': contentOptions }),
      ...init?.headers,
    },
  });

  return fetchResponse(res);
};

export const fetchRequest = {
  apiGet: async <T>(
    endPoint: string,
    options?: Omit<FetchOptions, 'contentType'>,
    params?: Record<string, QueryValue>,
  ): Promise<T> => {
    const query = resolveQuery(params);

    return clientFetch<T>(`${endPoint}${query}`, {
      method: 'GET',
      ...options,
    });
  },

  apiPost: async <T, B = unknown>(
    endPoint: string,
    options?: FetchOptions,
    body?: B | FormData,
  ): Promise<T> => {
    return clientFetch<T>(endPoint, {
      method: 'POST',
      ...options,
      ...(body !== undefined && {
        body: resolveBody(body, options?.contentType),
      }),
    });
  },

  apiPut: async <T, B = unknown>(
    endPoint: string,
    options?: FetchOptions,
    body?: B | FormData,
  ): Promise<T> => {
    return clientFetch<T>(endPoint, {
      method: 'PUT',
      ...options,
      ...(body !== undefined && {
        body: resolveBody(body, options?.contentType),
      }),
    });
  },

  apiPatch: async <T, B = unknown>(
    endPoint: string,
    options?: FetchOptions,
    body?: B | FormData,
  ): Promise<T> => {
    return clientFetch<T>(endPoint, {
      method: 'PATCH',
      ...options,
      ...(body !== undefined && {
        body: resolveBody(body, options?.contentType),
      }),
    });
  },

  apiDelete: async <T = void>(
    endPoint: string,
    options?: Omit<FetchOptions, 'contentType'>,
  ): Promise<T> => {
    return clientFetch<T>(endPoint, {
      method: 'DELETE',
      ...options,
    });
  },
} as const;
