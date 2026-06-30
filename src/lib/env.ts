import { z } from 'zod';

// Environment variable schema with validation
const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_API_URL: z.string().url(),

  // Database
  DATABASE_URL: z.string(),

  // Authentication
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),

  // Admin
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(8),

  // Optional: Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // Optional: AI
  OPENAI_API_KEY: z.string().optional(),
  AI_MODEL: z.string().default('gpt-4o-mini'),

  // Optional: Analytics
  GOOGLE_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),

  // Optional: Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform((val) => parseInt(val, 10)).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),

  // Optional: File Upload
  UPLOADTHING_SECRET: z.string().optional(),
  NEXT_PUBLIC_UPLOADTHING_APP_ID: z.string().optional(),

  // Optional: Rate Limiting
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // Optional: Monitoring
  SENTRY_DSN: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
});

// Validate environment variables
export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  AI_MODEL: process.env.AI_MODEL,
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM,
  UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
  NEXT_PUBLIC_UPLOADTHING_APP_ID: process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  SENTRY_DSN: process.env.SENTRY_DSN,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
});

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;

// Helper to check if we're in production
export const isProduction = env.NODE_ENV === 'production';
export const isDevelopment = env.NODE_ENV === 'development';
export const isTest = env.NODE_ENV === 'test';

// Database helper
export const getDatabaseUrl = () => {
  if (isProduction) {
    // In production, use PostgreSQL (Supabase)
    if (!env.DATABASE_URL.includes('postgresql')) {
      throw new Error('Production requires PostgreSQL DATABASE_URL');
    }
    return env.DATABASE_URL;
  }
  
  // In development/test, use SQLite
  if (!env.DATABASE_URL.includes('sqlite') && !env.DATABASE_URL.includes('file:')) {
    // Fallback to SQLite for development
    return 'file:./dev.db';
  }
  
  return env.DATABASE_URL;
};

// Feature flags
export const hasSupabase = !!env.NEXT_PUBLIC_SUPABASE_URL;
export const hasAI = !!env.OPENAI_API_KEY;
export const hasAnalytics = !!env.NEXT_PUBLIC_GA_ID;
export const hasEmail = !!env.SMTP_HOST;
export const hasFileUpload = !!env.UPLOADTHING_SECRET;
export const hasRateLimiting = !!env.UPSTASH_REDIS_REST_URL;
export const hasMonitoring = !!env.SENTRY_DSN;