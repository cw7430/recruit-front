import { z } from 'zod';

export const loginRequestSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .regex(/^[가-힣]+$/, '이름 형식이 올바르지 않습니다.'),
  phone: z
    .string()
    .min(1, '휴대전화 번호를 입력해주세요.')
    .regex(
      /^(010|011|016|017|018|019)-\d{3,4}-\d{4}$/,
      '휴대전화번호 형식이 올바르지 않습니다.',
    ),
  password: z.string().min(1, '비밀 번호를 입력해주세요.'),
});

export const loginResponseSchema = z.object({
  accessTokenExpiresAtMs: z.number(),
  refreshTokenExpiresAtMs: z.number(),
});

export const loginResponseSchemaForServer = loginResponseSchema.extend({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginRequestDto = z.infer<typeof loginRequestSchema>;
export type LoginResponseDto = z.infer<typeof loginResponseSchema>;
export type LoginResponseDtoForServer = z.infer<
  typeof loginResponseSchemaForServer
>;
