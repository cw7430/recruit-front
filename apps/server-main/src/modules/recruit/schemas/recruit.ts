import { z } from 'zod';

import {
  baseRecruitSchema,
  baseRecruitCalculateSchema,
  baseLocationSchema,
} from '@repo/shared-schemas/schemas/recruit';
import { educationRequestSchema, educationResponseSchema } from './education';
import { careerRequestSchema, careerResponseSchema } from './career';
import {
  certificateRequestSchema,
  certificateResponseSchema,
} from './certificate';

export const recruitRequestSchema = baseRecruitSchema
  .extend({
    birth: z.coerce.date('생년월일 형식이 올바르지 않습니다.'),
    gender: z.enum(['M', 'F'], '성별 형식이 올바르지 않습니다.'),
    email: z
      .string()
      .min(1, '이메일 입력해주세요.')
      .pipe(z.email('이메일 형식이 올바르지 않습니다.')),
    address: z.string().min(1, '주소를 입력해주세요.'),
    locSeq: z.string().min(1, '희망 지역을 선택해주세요.'),
    workType: z.enum(
      ['FULL_TIME', 'NON_REGULAR'],
      '희망 직무 형식이 올바르지 않습니다.',
    ),
    submit: z.enum(['N', 'Y'], '제출여부 형식이 올바르지 않습니다.'),
    educationList: z
      .array(educationRequestSchema)
      .min(1, '학력사항은 최소한 1개 이상 들어가야 합니다.'),
    careerList: z.array(careerRequestSchema),
    certificateList: z.array(certificateRequestSchema),
  })
  .superRefine((data, ctx) => {
    const { birth } = data;

    if (!birth) return;

    if (birth > new Date()) {
      ctx.addIssue({
        code: 'custom',
        message: '생년월일은 미래 날짜일 수 없습니다.',
        path: ['birth'],
      });
    }
  });

export const recruitResponseSchema = baseRecruitSchema.extend({
  recSeq: z.string(),
  name: z.string(),
  birth: z.coerce.date().nullable(),
  gender: z.enum(['M', 'F']).nullable(),
  phone: z.string(),
  email: z.email().nullable(),
  address: z.string().nullable(),
  locSeq: z.string().nullable(),
  workType: z.enum(['FULL_TIME', 'NON_REGULAR']).nullable(),
  educationList: z.array(educationResponseSchema),
  careerList: z.array(careerResponseSchema),
  certificateList: z.array(certificateResponseSchema),
  calculate: baseRecruitCalculateSchema.nullable(),
  locationList: z.array(baseLocationSchema),
});

export type RecruitRequestDto = z.infer<typeof recruitRequestSchema>;
export type RecruitResponseDto = z.infer<typeof recruitResponseSchema>;
