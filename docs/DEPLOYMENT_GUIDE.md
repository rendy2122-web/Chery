# Deployment Guide

Panduan lengkap untuk deployment proyek Chery Indonesia Website ke production.

## 📋 Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Vercel Deployment](#vercel-deployment)
- [Database Migration](#database-migration)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)
- [Rollback Procedure](#rollback-procedure)
- [Monitoring](#monitoring)

## ✅ Pre-Deployment Checklist

Sebelum deploy ke production, pastikan:

- [ ] Semua tests pass (`npm test`)
- [ ] TypeScript type check pass (`npm run type-check`)
- [ ] Linting pass (`npm run lint`)
- [ ] Build berhasil (`npm run build`)
- [ ] Semua environment variables sudah dikonfigurasi
- [ ] Database migration sudah dibuat dan tested
- [ ] Security review dilakukan
- [ ] Documentation sudah diupdate
- [ ] Code review sudah dilakukan
- [ ] Branch protection sudah di-setup di GitHub

## 🚀 Vercel Deployment

### 1. Setup Vercel Account

1. Buat akun di [Vercel](https://vercel.com)
2. Connect GitHub repository Anda
3. Import project `chery-website`

### 2. Configure Project Settings

Di Vercel Dashboard:

**General Settings:**
- Framework Preset: Next.js
- Root Directory: `.` (root)
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**Environment Variables:**
```
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
NEXTAUTH_SECRET=<generate-with-openssl>
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
ADMIN_EMAIL=admin@chery.com
ADMIN_PASSWORD=<secure-password>
```

### 3. Deploy to Production

**Option 1: Automatic Deployment (Recommended)**

Push ke branch `main` akan trigger automatic deployment:

```bash
git push origin main
```

**Option 2: Manual Deployment via CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

**Option 3: Manual Deployment via GitHub Actions**

Deployment sudah di-automate via GitHub Actions. Setelah PR merged ke `main`, deployment akan otomatis di-trigger.

### 4. Custom Domain

1. Di Vercel Dashboard, go to **Settings > Domains**
2. Add custom domain: `chery.co.id`
3. Configure DNS records di domain provider Anda:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for SSL certificate (otomatis dari Vercel)

## 🗄️ Database Migration

### Production Database Setup (Supabase)

1. **Create Supabase Project**
   - Go to [Supabase](https://supabase.com)
   - Create new project
   - Note down database credentials

2. **Get Connection String**
   ```
   postgresql://postgres:[password]@[host]:5432/postgres
   ```

3. **Run Migrations**

   ```bash
   # Set environment variable
   export DATABASE_URL="postgresql://..."

   # Run migrations
   npx prisma migrate deploy

   # Seed production data (optional)
   npx prisma db seed
   ```

### Migration Best Practices

```bash
# 1. Always backup before migration
pg_dump $DATABASE_URL > backup.sql

# 2. Test migration locally first
npm run db:migrate

# 3. Deploy migration to production
npx prisma migrate deploy

# 4. Verify migration success
npx prisma migrate status
```

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://...` |
| `NEXTAUTH_SECRET` | Auth secret (32+ chars) | `openssl rand-base64 32` |
| `NEXTAUTH_URL` | Auth callback URL | `https://chery.co.id` |
| `NEXT_PUBLIC_APP_URL` | Public app URL | `https://chery.co.id` |
| `NEXT_PUBLIC_API_URL` | API URL | `https://chery.co.id/api` |
| `ADMIN_EMAIL` | Admin email | `admin@chery.com` |
| `ADMIN_PASSWORD` | Admin password | `<secure-password>` |

### Optional Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `OPENAI_API_KEY` | OpenAI API key for AI assistant |
| `GOOGLE_ANALYTICS_ID` | Google Analytics ID |
| `SENTRY_DSN` | Sentry error tracking |

### Setting Environment Variables

**Vercel Dashboard:**
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add each variable
4. Select environment (Production, Preview, Development)
5. Save and redeploy

**Via Vercel CLI:**
```bash
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
```

## 🔄 Post-Deployment

### 1. Verify Deployment

```bash
# Check if site is accessible
curl https://chery.co.id

# Check API health
curl https://chery.co.id/api/health

# Check sitemap
curl https://chery.co.id/sitemap.xml

# Check robots.txt
curl https://chery.co.id/robots.txt
```

### 2. Database Verification

```bash
# Connect to production database
npx prisma studio --url $DATABASE_URL

# Or run query
npx prisma db execute --url $DATABASE_URL --stdin <<< "SELECT COUNT(*) FROM Vehicle;"
```

### 3. Performance Testing

- Run [Lighthouse](https://pagespeed.web.dev/) audit
- Check Core Web Vitals
- Test on multiple devices
- Verify image optimization

### 4. Security Verification

```bash
# Check security headers
curl -I https://chery.co.id

# Verify HTTPS redirect
curl -I http://chery.co.id

# Check for exposed secrets
# (Use tools like truffleHog or git-secrets)
```

## ⏪ Rollback Procedure

### Quick Rollback di Vercel

1. **Via Dashboard:**
   - Go to Deployments
   - Find previous working deployment
   - Click "..." → "Promote to Production"

2. **Via CLI:**
   ```bash
   # List deployments
   vercel list

   # Rollback to specific deployment
   vercel rollback [deployment-url]
   ```

### Database Rollback

```bash
# 1. Backup current state
pg_dump $DATABASE_URL > rollback_backup.sql

# 2. Rollback migration
npx prisma migrate resolve --rolled-back [migration-name]

# 3. Revert to previous migration
npx prisma migrate deploy

# 4. Verify data integrity
npx prisma studio
```

### Emergency Rollback Checklist

- [ ] Identify issue
- [ ] Rollback deployment
- [ ] Notify team
- [ ] Create incident report
- [ ] Fix issue in development
- [ ] Test thoroughly
- [ ] Deploy fix

## 📊 Monitoring

### Vercel Analytics

- Enable Vercel Analytics di dashboard
- Monitor:
  - Page views
  - Unique visitors
  - Top pages
  - Load times
  - Error rates

### Application Monitoring

**Recommended Tools:**
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Datadog**: APM & monitoring
- **UptimeRobot**: Uptime monitoring

### Health Check Endpoint

Create health check endpoint:

```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error.message,
      },
      { status: 503 }
    );
  }
}
```

### Monitoring Checklist

- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure error tracking (Sentry)
- [ ] Enable performance monitoring
- [ ] Set up alerts for critical errors
- [ ] Monitor database performance
- [ ] Track API response times
- [ ] Monitor server resources

## 🔐 Security Considerations

### Production Security Checklist

- [ ] HTTPS enforced (HSTS header)
- [ ] Security headers configured
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] Admin access restricted
- [ ] API rate limiting enabled
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] SQL injection prevented (Prisma)
- [ ] XSS protection enabled
- [ ] CSRF protection active

### SSL/TLS Configuration

Vercel automatically provides SSL certificates. Verify:

```bash
# Check SSL certificate
openssl s_client -connect chery.co.id:443 -servername chery.co.id

# Test SSL configuration
https://www.ssllabs.com/ssltest/
```

## 📈 Performance Optimization

### Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL={placeholder}
/>
```

### Caching Strategy

```typescript
// API routes
export const revalidate = 3600; // 1 hour

// Static pages
export const dynamic = 'force-static';
```

### Bundle Optimization

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Check for duplicates
npx next-bundle-analyzer
```

## 🚨 Incident Response

### Severity Levels

- **P0 (Critical)**: Site down, data breach
- **P1 (High)**: Major feature broken
- **P2 (Medium)**: Minor feature broken
- **P3 (Low)**: UI/UX issues

### Response Process

1. **Detect**: Monitoring alerts
2. **Assess**: Determine severity
3. **Communicate**: Notify stakeholders
4. **Mitigate**: Rollback or hotfix
5. **Resolve**: Deploy fix
6. **Review**: Post-mortem analysis

### Emergency Contacts

- **DevOps**: devops@chery.co.id
- **Tech Lead**: techlead@chery.co.id
- **On-Call**: +62-xxx-xxxx-xxxx

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Production Guide](https://www.prisma.io/docs/guides/deployment)
- [Supabase Production](https://supabase.com/docs/guides/deployment)

---

**Deployment successful! 🎉**