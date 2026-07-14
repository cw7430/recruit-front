import { z } from 'zod';

export const baseLocationSchema = z.object({
  locSeq: z.string(),
  locName: z.string(),
})
