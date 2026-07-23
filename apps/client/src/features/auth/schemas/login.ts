import { z } from 'zod';

import {
  baseLoginRequestSchema,
  baseLoginResponseSchema,
} from '@repo/shared-schemas/schemas/auth';

export const loginRequestSchema = baseLoginRequestSchema;
export const loginResponseSchema = baseLoginResponseSchema;
export const authStateSchema = baseLoginResponseSchema.extend({
  accessTokenExpiresAtMs: z.number().nullable(),
});

export type LoginRequestDto = z.infer<typeof loginRequestSchema>;
export type LoginResponseDto = z.infer<typeof loginResponseSchema>;
export type AuthStateData = z.infer<typeof authStateSchema>;
export type AuthState = AuthStateData & {
  hasHydrated: boolean;

  setHasHydrated: (v: boolean) => void;

  login: (data: LoginResponseDto) => void;

  logout: () => void;
};
