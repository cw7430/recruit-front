import { z } from 'zod';

export const baseRecruitCalculateSchema = z.object({
  eduInfo: z.string().nullable(),
  carInfo: z.string().nullable(),
  hopeSal: z.string().nullable(),
  hopeLoc: z.string().nullable(),
  workType: z.string().nullable(),
});
