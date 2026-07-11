import { z } from 'zod';

const baseEducationSchema = z.object({
  eduSeq: z.string(),
  schoolName: z.string(),
  schoolType: z.enum([
    'HIGH_SCHOOL',
    'ASSOCIATE',
    'BACHELOR',
    'MASTER',
    'DOCTORATE',
  ]),
  division: z.enum(['GRADUATED', 'ENROLLED', 'DROPPED_OUT']),
  startPeriod: z.coerce.date(),
  endPeriod: z.coerce.date(),
  major: z.string(),
  grade: z.string(),
  locSeq: z.string(),
});

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
    major: z.string().min(1, '전공을 입력해주세요.'),
    grade: z.string().min(1, '학점을 입력해주세요.'),
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
