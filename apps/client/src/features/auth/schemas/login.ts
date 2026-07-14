import { z } from 'zod';

import {
  baseLoginRequestSchema,
  baseLoginResponseSchema,
} from '@repo/shared-schemas/src/schemas/auth';

export const loginRequestSchema = baseLoginRequestSchema;
export const loginResponseSchema = baseLoginResponseSchema;

export type LoginRequestDto = z.infer<typeof loginRequestSchema>;
export type LoginResponseDto = z.infer<typeof loginResponseSchema>;
