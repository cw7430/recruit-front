import { z } from 'zod';

import { baseLocationSchema } from '@repo/shared-schemas/schemas/recruit';

export const locationResponseSchema = baseLocationSchema.extend({
  locSeq: z.string().transform((val) => BigInt(val)),
});
