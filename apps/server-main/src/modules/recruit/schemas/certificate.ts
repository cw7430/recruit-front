import { z } from 'zod';

import { baseCertificateSchema } from '@repo/shared-schemas/src/schemas/recruit';

export const certificateRequestSchema = baseCertificateSchema
  .extend({
    certSeq: z.string().nullable(),
    qualifyName: z
      .string()
      .min(1, '자격증명을 입력해주세요.')
      .regex(/^[가-힣a-zA-Z0-9\s-]+$/, '자격증명 형식이 올바르지 않습니다.'),
    acquDate: z.coerce.date('취득일 형식이 올바르지 않습니다.'),
    organizeName: z
      .string()
      .min(1, '발행기관명을 입력해주세요.')
      .regex(/^[가-힣a-zA-Z0-9\s-]+$/, '발행기관명 형식이 올바르지 않습니다.'),
  })
  .superRefine((data, ctx) => {
    const { acquDate } = data;

    if (!acquDate) return;

    if (acquDate > new Date()) {
      ctx.addIssue({
        code: 'custom',
        message: '취득일은 미래 날짜일 수 없습니다.',
        path: ['acquDate'],
      });
    }
  });

export const certificateResponseSchema = baseCertificateSchema;
