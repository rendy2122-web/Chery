# Environment Setup Guide

Panduan lengkap untuk konfigurasi environment variables di proyek Chery Indonesia Website.

## 📋 Table of Contents

- [Overview](#overview)
- [Environment Files](#environment-files)
- [Required Variables](#required-variables)
- [Optional Variables](#optional-variables)
- [Setup Instructions](#setup-instructions)
- [Validation](#validation)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

Project ini menggunakan environment variables untuk konfigurasi yang berbeda antara development, staging, dan production. Semua environment variables divalidasi menggunakan Zod untuk memastikan type safety dan keamanan.

## 📁 Environment Files

### File Structure

```
.env.example          # Template (committed to git)
.env.local           # Local development (git-ignored)
.env.development     # Development overrides (git-ignored)
.env.production      # Production overrides (git-ignored)
.env.test            # Testing overrides (git-ignored)
```

### File Purposes

| File | Purpose | Committed |
|------|---------|-----------|
| `.env.example` | Template dengan semua variables | ✅ Yes |
| `.env.local` | Local development overrides | ❌ No |
| `.env.development` | Development environment | ❌ No |
| `.env.production` | Production environment | ❌ No |
| `.env.test` | Test environment | ❌ No |

## 🔑 Required Variables

### Application Core

```env
# Environment Mode
NODE_ENV=development  # development | production | test

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Description:**
- `NODE_ENV`: Determines app behavior (development vs production)
- `NEXT_PUBLIC_APP_URL`: Public URL of your application
- `NEXT_PUBLIC_API_URL`: API endpoint URL

### Database

```env
# Development (SQLite)
DATABASE_URL="file:./dev.db"

# Production (PostgreSQL/Supabase)
# DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

**Description:**
- `DATABASE_URL`: Database connection string
- Development: Uses SQLite for fast local development
- Production: Uses PostgreSQL (Supabase recommended)

### Authentication

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-min-32-characters-long
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials (for seeding)
ADMIN_EMAIL=admin@chery.com
ADMIN_PASSWORD=your-secure-password-here
```

**Description:**
- `NEXTAUTH_SECRET`: Secret key for encrypting sessions (min 32 chars)
- `NEXTAUTH_URL`: Callback URL for authentication
- `ADMIN_EMAIL`: Admin user email (used in seed)
- `ADMIN_PASSWORD`: Admin user password (used in seed)

**Generate NEXTAUTH_SECRET:**
```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Using online tool
# Visit: https://generate-secret.vercel.app/32
```

## 🔧 Optional Variables

### Supabase (Production)

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**When to use:**
- For direct Supabase client integration
- For real-time subscriptions
- For storage operations

### AI Assistant

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key
AI_MODEL=gpt-4o-mini  # or gpt-4, gpt-3.5-turbo
```

**When to use:**
- AI-powered chatbot
- Content generation
- Smart recommendations

### Analytics

```env
# Google Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**When to use:**
- Track website traffic
- Monitor user behavior
- Analyze conversions

### Email Service

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@chery.com
```

**When to use:**
- Send transactional emails
- Lead notifications
- Password reset emails

**Gmail Setup:**
1. Enable 2-factor authentication
2. Generate app password
3. Use app password in `SMTP_PASSWORD`

### File Upload

```env
# UploadThing Configuration
UPLOADTHING_SECRET=your-uploadthing-secret
NEXT_PUBLIC_UPLOADTHING_APP_ID=your-app-id
```

**When to use:**
- Image uploads
- File management
- Media library

### Rate Limiting

```env
# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

**When to use:**
- API rate limiting
- Session storage
- Caching

### Monitoring

```env
# Sentry Error Tracking
SENTRY_DSN=https://xxx@sentry.io/xxx
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```

**When to use:**
- Error tracking
- Performance monitoring
- Release tracking

## 🚀 Setup Instructions

### 1. Development Setup

```bash
# 1. Copy environment template
cp .env.example .env.local

# 2. Edit .env.local with your values
# Minimum required:
# - NODE_ENV=development
# - DATABASE_URL="file:./dev.db"
# - NEXTAUTH_SECRET=<generate-secret>
# - NEXTAUTH_URL=http://localhost:3000
# - ADMIN_EMAIL=admin@chery.com
# - ADMIN_PASSWORD=<secure-password>

# 3. Verify setup
npm run type-check
```

**Example `.env.local` for development:**
```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET=dev-secret-key-min-32-characters-1234567890
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@chery.com
ADMIN_PASSWORD=dev-password-123
```

### 2. Production Setup (Vercel)

**Via Vercel Dashboard:**

1. Go to your project in Vercel
2. Navigate to **Settings > Environment Variables**
3. Add each variable:

```
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
NEXTAUTH_SECRET=<generated-secret>
NEXTAUTH_URL=https://chery.co.id
NEXT_PUBLIC_APP_URL=https://chery.co.id
NEXT_PUBLIC_API_URL=https://chery.co.id/api
ADMIN_EMAIL=admin@chery.com
ADMIN_PASSWORD=<secure-production-password>
```

4. Select environment: **Production**
5. Click **Save**
6. Redeploy your application

**Via Vercel CLI:**

```bash
# Login to Vercel
vercel login

# Add environment variables
vercel env add NODE_ENV production
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
vercel env add NEXT_PUBLIC_APP_URL production
vercel env add NEXT_PUBLIC_API_URL production
vercel env add ADMIN_EMAIL production
vercel env add ADMIN_PASSWORD production

# Pull environment variables to local
vercel env pull .env.local
```

### 3. Staging Setup

```bash
# Create .env.development for staging
cat > .env.development << EOF
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://staging.chery.co.id
NEXT_PUBLIC_API_URL=https://staging.chery.co.id/api
DATABASE_URL=postgresql://staging-user:pass@host:5432/staging-db
NEXTAUTH_SECRET=<staging-secret>
NEXTAUTH_URL=https://staging.chery.co.id
ADMIN_EMAIL=admin@chery.com
ADMIN_PASSWORD=<staging-password>
EOF
```

### 4. Test Setup

```bash
# Create .env.test for testing
cat > .env.test << EOF
NODE_ENV=test
DATABASE_URL="file:./test.db"
NEXTAUTH_SECRET=test-secret-key-min-32-characters-1234567890
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=test@example.com
ADMIN_PASSWORD=testpassword123
EOF
```

## ✅ Validation

### Automatic Validation

Environment variables are automatically validated using Zod in `src/lib/env.ts`:

```typescript
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  DATABASE_URL: z.string(),
  NEXTAUTH_SECRET: z.string().min(32),
  // ... other variables
});

export const env = envSchema.parse(process.env);
```

### Manual Validation

```bash
# Run type check to validate environment
npm run type-check

# Or test with Node.js
node -e "
require('dotenv').config();
const z = require('zod');

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
});

try {
  schema.parse(process.env);
  console.log('✅ Environment variables valid');
} catch (error) {
  console.error('❌ Invalid environment variables:', error);
  process.exit(1);
}
"
```

### Validation Script

Create `scripts/validate-env.js`:

```javascript
#!/usr/bin/env node

const dotenv = require('dotenv');
const z = require('zod');

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_API_URL: z.string().url(),
  DATABASE_URL: z.string(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(8),
});

try {
  envSchema.parse(process.env);
  console.log('✅ All environment variables are valid');
  process.exit(0);
} catch (error) {
  console.error('❌ Environment validation failed:');
  console.error(error.errors);
  process.exit(1);
}
```

Run validation:
```bash
node scripts/validate-env.js
```

## 🎯 Best Practices

### 1. Never Commit Secrets

```bash
# ✅ GOOD: Use .env files
DATABASE_URL="postgresql://user:pass@host:5432/db"

# ❌ BAD: Hardcoded in code
const dbUrl = "postgresql://user:pass@host:5432/db";
```

### 2. Use Strong Secrets

```bash
# ✅ GOOD: Strong secret
NEXTAUTH_SECRET=K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/1s=

# ❌ BAD: Weak secret
NEXTAUTH_SECRET=password123
NEXTAUTH_SECRET=secret
```

### 3. Different Secrets per Environment

```bash
# Development
NEXTAUTH_SECRET=dev-secret-key-12345678901234567890123456789012

# Staging
NEXTAUTH_SECRET=staging-secret-key-12345678901234567890123456789012

# Production
NEXTAUTH_SECRET=prod-secret-key-12345678901234567890123456789012
```

### 4. Use Environment-Specific URLs

```env
# Development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Staging
NEXT_PUBLIC_APP_URL=https://staging.chery.co.id

# Production
NEXT_PUBLIC_APP_URL=https://chery.co.id
```

### 5. Validate Early

```typescript
// Validate environment variables at app startup
import { env } from '@/lib/env';

// This will throw an error if validation fails
console.log('Environment validated:', env.NODE_ENV);
```

## 🔍 Troubleshooting

### Common Issues

#### 1. "Environment variable not found"

**Solution:**
```bash
# Check if .env.local exists
ls -la .env.local

# If not, create it
cp .env.example .env.local

# Edit with your values
nano .env.local
```

#### 2. "Invalid DATABASE_URL"

**Solution:**
```bash
# For SQLite (development)
DATABASE_URL="file:./dev.db"

# For PostgreSQL (production)
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# Test connection
npx prisma db push
```

#### 3. "NEXTAUTH_SECRET too short"

**Solution:**
```bash
# Generate proper secret (32+ characters)
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### 4. "Database connection failed"

**Solution:**
```bash
# Check if database is running
# For SQLite: Check if file exists
ls -la prisma/dev.db

# For PostgreSQL: Check connection
psql $DATABASE_URL -c "SELECT 1"

# Reset database
npm run db:reset
```

#### 5. "Type error on environment variables"

**Solution:**
```bash
# Clear TypeScript cache
rm -rf .next tsconfig.tsbuildinfo

# Restart development server
npm run dev
```

### Debug Mode

Enable debug logging:

```env
# Add to .env.local
DEBUG=app:env,prisma:*
```

Then check logs:
```bash
npm run dev
```

## 📚 Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Prisma Environment Variables](https://www.prisma.io/docs/guides/development-and-deployment/environment-variables)
- [Zod Documentation](https://zod.dev/)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)

## 🔒 Security Checklist

- [ ] All secrets are at least 32 characters long
- [ ] Different secrets for each environment
- [ ] `.env*` files are in `.gitignore`
- [ ] No secrets in code or commits
- [ ] Production secrets are strong and unique
- [ ] Environment variables are validated
- [ ] Secrets are rotated regularly
- [ ] Access to production secrets is restricted

## 📞 Support

Jika Anda mengalami masalah dengan environment setup:

1. Check [documentation](docs/)
2. Search [existing issues](https://github.com/your-org/chery-website/issues)
3. Create new issue dengan label `env-setup`

---

**Environment configured successfully! ✅**