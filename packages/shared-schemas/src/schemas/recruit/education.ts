import { z } from 'zod';

export const baseEducationSchema = z.object({
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
