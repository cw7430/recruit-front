import { z } from 'zod';

const baseCareerSchema = z.object({
  carSeq: z.string(),
  compName: z.string(),
  locSeq: z.string(),
  startPeriod: z.coerce.date(),
  endPeriod: z.coerce.date(),
  task: z.string(),
});

export const careerRequestSchema = baseCareerSchema
  .extend({
    carSeq: z.string().nullable(),
    compName: z
      .string()
      .min(1, '회사명을 입력해주세요.')
      .regex(/^[가-힣a-zA-Z0-9\s-]+$/, '회사명 형식이 올바르지 않습니다.'),
    locSeq: z.string().min(1, '지역을 선택해주세요.'),
    startPeriod: z.coerce.date('입사일 형식이 올바르지 않습니다.'),
    endPeriod: z.coerce.date('퇴사일 형식이 올바르지 않습니다.'),
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
