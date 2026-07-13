import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  PORT: Number(process.env.PORT ?? 3000),
  CLIENT_URL: process.env.CLIENT_URL ?? 'http://localhost:5173',
  INTERNAL_URL: process.env.INTERNAL_URL ?? 'http://localhost:8080/api/v1',
} as const;
