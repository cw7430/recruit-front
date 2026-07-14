import { z } from 'zod';

import { baseCareerSchema } from '@repo/shared-schemas/src/schemas/recruit';

export const careerRequestSchema = baseCareerSchema
  .extend({
    carSeq: z.string().nullable(),
    compName: z
      .string()
      .min(1, '회사명을 입력해주세요.')
      .regex(/^[가-힣a-zA-Z0-9\s-]+$/, '회사명 형식이 올바르지 않습니다.'),
    locSeq: z.string().min(1, '지역을 선택해주세요.'),
    startPeriod: z
      .string()
      .regex(/^\d{4}-\d{2}$/, '입사일 형식은 YYYY-MM이어야 합니다.')
      .transform((val) => new Date(`${val}-01`)),
    endPeriod: z
      .string()
      .regex(/^\d{4}-\d{2}$/, '퇴사일 형식은 YYYY-MM이어야 합니다.')
      .transform((val) => new Date(`${val}-01`)),
    task: z.string().min(1, '직무를 입력해주세요.'),
  })
  .superRefine((data, ctx) => {
    const { startPeriod, endPeriod } = data;

    if (!startPeriod || !endPeriod) return;

    if (startPeriod > new Date()) {
      ctx.addIssue({
        code: 'custom',
        message: '입사일은 미래 날짜일 수 없습니다.',
        path: ['startPeriod'],
      });
    }

    if (startPeriod >= endPeriod) {
      ctx.addIssue({
        code: 'custom',
        message: '입사일은 퇴사일보다 빨라야 합니다.',
        path: ['startPeriod'],
      });
    }
  });

export const careerResponseSchema = baseCareerSchema.extend({
  carSeq: z.string().transform((val) => BigInt(val)),
  locSeq: z.string().transform((val) => BigInt(val)),
});
