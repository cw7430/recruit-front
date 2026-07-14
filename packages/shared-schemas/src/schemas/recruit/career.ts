import { z } from 'zod';

export const baseCareerSchema = z.object({
  carSeq: z.string(),
  compName: z.string(),
  locSeq: z.string(),
  startPeriod: z.coerce.date(),
  endPeriod: z.coerce.date(),
  task: z.string(),
});
