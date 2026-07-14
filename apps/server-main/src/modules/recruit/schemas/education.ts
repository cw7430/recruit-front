import { z } from 'zod';
import { Decimal } from 'decimal.js';

import { baseEducationSchema } from '@repo/shared-schemas/src/schemas/recruit';

export const educationRequestSchema = baseEducationSchema
  .extend({
    eduSeq: z.string().nullable(),
    schoolName: z
      .string()
      .min(1, '학교명을 입력해주세요.')
      .regex(/^[가-힣a-zA-Z0-9\s-]+$/, '학교명 형식이 올바르지 않습니다.'),
    schoolType: z.enum(
      ['HIGH_SCHOOL', 'ASSOCIATE', 'BACHELOR', 'MASTER', 'DOCTORATE'],
      '학종 형식이 올바르지 않습니다.',
    ),
    division: z.enum(
      ['GRADUATED', 'ENROLLED', 'DROPPED_OUT'],
      '구분 형식이 올바르지 않습니다.',
    ),
    startPeriod: z.coerce.date('입학일 형식이 올바르지 않습니다.'),
    endPeriod: z.coerce.date('졸업일 형식이 올바르지 않습니다.'),
    grade: z
      .string()
      .min(1, '학점을 입력해주세요.')
      .refine((grade) => {
        const value = new Decimal(grade);
        return value.gte(0) && value.lte(4.5);
      }, '학점은 0.00부터 4.50까지 입력 가능합니다.'),
    locSeq: z.string().min(1, '지역을 선택해주세요.'),
  })
  .superRefine((data, ctx) => {
    const { startPeriod, endPeriod } = data;

    if (!startPeriod || !endPeriod) return;

    if (startPeriod > new Date()) {
      ctx.addIssue({
        code: 'custom',
        message: '입학일은 미래 날짜일 수 없습니다.',
        path: ['startPeriod'],
      });
    }

    if (startPeriod >= endPeriod) {
      ctx.addIssue({
        code: 'custom',
        message: '입학일은 졸업일보다 빨라야 합니다.',
        path: ['startPeriod'],
      });
    }
  });

export const educationResponseSchema = baseEducationSchema;
