import type { ResponseCodeType } from '@repo/shared-schemas/constants';
import type { ValidationError } from '@repo/shared-schemas/schemas';

export class ApiError extends Error {
  public readonly code: Exclude<ResponseCodeType, 'SU'>;
  public readonly errors?: ValidationError[];

  constructor(
    code: Exclude<ResponseCodeType, 'SU'>,
    message: string,
    errors?: ValidationError[],
  ) {
    super(message);
    this.code = code;
    this.errors = errors;
    this.name = 'ApiError';
  }
}
