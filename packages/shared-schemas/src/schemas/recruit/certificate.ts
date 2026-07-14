import { z } from 'zod';

export const baseCertificateSchema = z.object({
  certSeq: z.string(),
  qualifyName: z.string(),
  acquDate: z.coerce.date(),
  organizeName: z.string(),
});
