# Deployment Checklist

Checklist lengkap untuk deployment proyek Chery Indonesia Website ke production.

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] Semua tests pass (`npm test`)
- [ ] TypeScript type check pass (`npm run type-check`)
- [ ] Linting pass (`npm run lint`)
- [ ] Build berhasil tanpa error (`npm run build`)
- [ ] Code review sudah dilakukan
- [ ] Semua PR sudah di-merge ke `main`

### Security
- [ ] Environment variables aman dan tidak ada di code
- [ ] `.env*` files tidak ter-commit ke git
- [ ] NEXTAUTH_SECRET minimal 32 karakter
- [ ] Semua passwords kuat dan unique
- [ ] Security headers sudah dikonfigurasi
- [ ] CORS sudah di-setup dengan benar
- [ ] Rate limiting aktif
- [ ] Input validation implemented
- [ ] SQL injection prevention (menggunakan Prisma)

### Database
- [ ] Database migration sudah dibuat
- [ ] Migration sudah di-test di staging
- [ ] Backup database production dibuat
- [ ] Prisma Client sudah di-generate
- [ ] Seed data sudah disiapkan (jika diperlukan)
- [ ] Database connection string benar

### Documentation
- [ ] README.md sudah di-update
- [ ] CHANGELOG.md sudah di-update
- [ ] API documentation sudah lengkap
- [ ] Deployment guide sudah diikuti
- [ ] Environment setup guide sudah diikuti

### Performance
- [ ] Image optimization enabled
- [ ] Font optimization enabled
- [ ] Code splitting implemented
- [ ] Lazy loading untuk heavy components
- [ ] Bundle size optimal (< 500KB initial)
- [ ] Lighthouse score > 90

### SEO
- [ ] Meta tags untuk semua halaman
- [ ] OpenGraph tags
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Structured data (Schema.org)
- [ ] Canonical URLs

## 🚀 Deployment Steps

### 1. Final Code Review
```bash
# Pull latest code
git checkout main
git pull origin main

# Verify all changes
git log --oneline -10

# Check for any uncommitted changes
git status
```

### 2. Environment Variables Setup

**Vercel Dashboard:**
1. Login ke [Vercel](https://vercel.com)
2. Select project `chery-website`
3. Go to **Settings > Environment Variables**
4. Add/verify semua variables:

```
NODE_ENV=production
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://chery.co.id
NEXT_PUBLIC_APP_URL=https://chery.co.id
NEXT_PUBLIC_API_URL=https://chery.co.id/api
ADMIN_EMAIL=admin@chery.com
ADMIN_PASSWORD=...
```

5. Select **Production** environment
6. Click **Save**

### 3. Database Migration

```bash
# Connect to production database
export DATABASE_URL="postgresql://..."

# Backup database (PENTING!)
pg_dump $DATABASE_URL > backup_before_deploy_$(date +%Y%m%d).sql

# Run migrations
npx prisma migrate deploy

# Verify migrations
npx prisma migrate status

# Seed data (jika diperlukan)
npx prisma db seed
```

### 4. Deploy to Production

**Option A: Automatic (Recommended)**
```bash
# Push ke branch main
git push origin main
# GitHub Actions akan otomatis deploy
```

**Option B: Manual via Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Option C: Via Vercel Dashboard**
1. Go to **Deployments**
2. Click **Deploy** button
3. Wait for deployment to complete

### 5. Post-Deployment Verification

```bash
# Check if site is accessible
curl -I https://chery.co.id

# Check API health
curl https://chery.co.id/api/health

# Check sitemap
curl https://chery.co.id/sitemap.xml

# Check robots.txt
curl https://chery.co.id/robots.txt

# Check security headers
curl -I https://chery.co.id | grep -E "X-Frame-Options|X-Content-Type-Options|Strict-Transport-Security"
```

### 6. Database Verification

```bash
# Connect to production database
npx prisma studio --url $DATABASE_URL

# Or run verification query
npx prisma db execute --url $DATABASE_URL --stdin <<< "
  SELECT 
    (SELECT COUNT(*) FROM Vehicle) as vehicles,
    (SELECT COUNT(*) FROM Dealer) as dealers,
    (SELECT COUNT(*) FROM News) as news,
    (SELECT COUNT(*) FROM User) as users;
"
```

### 7. Performance Testing

- [ ] Run Lighthouse audit: https://pagespeed.web.dev/
- [ ] Check Core Web Vitals
- [ ] Test on mobile devices
- [ ] Verify image optimization
- [ ] Check bundle size
- [ ] Test API response times

### 8. Security Verification

```bash
# Check SSL certificate
openssl s_client -connect chery.co.id:443 -servername chery.co.id

# Test SSL configuration
# Visit: https://www.ssllabs.com/ssltest/

# Check for exposed secrets
# Use tools like truffleHog or git-secrets

# Verify HTTPS redirect
curl -I http://chery.co.id
```

## 🔄 Rollback Plan

### Quick Rollback (Vercel)

```bash
# List recent deployments
vercel list

# Rollback to previous deployment
vercel rollback [deployment-url]
```

**Via Dashboard:**
1. Go to **Deployments**
2. Find previous working deployment
3. Click "..." → **Promote to Production**

### Database Rollback

```bash
# 1. Backup current state
pg_dump $DATABASE_URL > rollback_backup_$(date +%Y%m%d_%H%M%S).sql

# 2. Rollback migration
npx prisma migrate resolve --rolled-back [migration-name]

# 3. Revert to previous migration
npx prisma migrate deploy

# 4. Verify data integrity
npx prisma studio
```

## 📊 Monitoring Setup

### 1. Vercel Analytics
- [ ] Enable di Vercel Dashboard
- [ ] Monitor page views
- [ ] Check load times
- [ ] Review error rates

### 2. Error Tracking (Sentry)
- [ ] Create Sentry project
- [ ] Add SENTRY_DSN ke environment variables
- [ ] Configure error alerts
- [ ] Test error reporting

### 3. Uptime Monitoring
- [ ] Setup UptimeRobot atau Pingdom
- [ ] Monitor https://chery.co.id
- [ ] Monitor https://chery.co.id/api/health
- [ ] Configure alert notifications

### 4. Performance Monitoring
- [ ] Enable Vercel Analytics
- [ ] Setup Real User Monitoring (RUM)
- [ ] Monitor Core Web Vitals
- [ ] Track API response times

## 🚨 Incident Response

### Emergency Contacts
- **DevOps**: devops@chery.co.id
- **Tech Lead**: techlead@chery.co.id
- **On-Call**: +62-xxx-xxxx-xxxx

### Severity Levels

**P0 - Critical (Site Down)**
- Response time: < 15 minutes
- Action: Immediate rollback
- Communication: Immediate to stakeholders

**P1 - High (Major Feature Broken)**
- Response time: < 1 hour
- Action: Hotfix or rollback
- Communication: Within 30 minutes

**P2 - Medium (Minor Feature Broken)**
- Response time: < 4 hours
- Action: Fix in next deployment
- Communication: Within 2 hours

**P3 - Low (UI/UX Issues)**
- Response time: < 24 hours
- Action: Fix in regular sprint
- Communication: Next business day

### Incident Response Process

1. **Detect** - Monitoring alerts
2. **Assess** - Determine severity
3. **Communicate** - Notify stakeholders
4. **Mitigate** - Rollback or hotfix
5. **Resolve** - Deploy fix
6. **Review** - Post-mortem analysis

## ✅ Post-Deployment

### Immediate (0-1 hour)
- [ ] Site accessible
- [ ] All pages loading
- [ ] Forms submitting
- [ ] Database connected
- [ ] Authentication working
- [ ] No console errors

### Short-term (1-24 hours)
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Review user feedback
- [ ] Verify analytics tracking
- [ ] Check SEO indexing

### Long-term (1-7 days)
- [ ] Monitor database performance
- [ ] Review security logs
- [ ] Check backup integrity
- [ ] Optimize based on metrics
- [ ] Document lessons learned

## 📝 Sign-off

### Development Team
- [ ] Tech Lead approval
- [ ] Senior Developer approval
- [ ] QA approval

### Operations Team
- [ ] DevOps approval
- [ ] Security review
- [ ] Database admin approval

### Management
- [ ] Product Owner approval
- [ ] Project Manager approval

### Deployment Details
- **Deployed by**: 
- **Deployment date**: 
- **Version**: 
- **Commit hash**: 
- **Rollback plan**: 

---

**Deployment completed successfully! 🎉**