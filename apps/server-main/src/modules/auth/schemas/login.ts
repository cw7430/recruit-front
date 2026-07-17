import { z } from 'zod';

import {
  baseLoginRequestSchema,
  baseLoginResponseSchema,
} from '@repo/shared-schemas/schemas/auth';

export const loginRequestSchema = baseLoginRequestSchema;
export const loginResponseSchema = baseLoginResponseSchema.extend({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginRequestDto = z.infer<typeof loginRequestSchema>;
export type LoginResponseDto = z.infer<typeof loginResponseSchema>;
