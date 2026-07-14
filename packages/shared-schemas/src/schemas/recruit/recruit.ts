import { z } from 'zod';

export const baseRecruitSchema = z.object({
  birth: z.coerce.date(),
  gender: z.enum(['M', 'F']),
  email: z.email(),
  address: z.string(),
  locSeq: z.string(),
  workType: z.enum(['FULL_TIME', 'NON_REGULAR']),
});
