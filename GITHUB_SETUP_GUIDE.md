# GitHub Setup Guide - Step by Step

Panduan lengkap untuk setup GitHub repository dan professional workflow untuk Chery Indonesia Website.

---

## 📋 TABLE OF CONTENTS

1. [Initial Git Setup](#step-1--initial-git-setup)
2. [Create GitHub Repository](#step-2--create-github-repository)
3. [Branch Strategy Setup](#step-3--branch-strategy-setup)
4. [Environment Structure](#step-4--environment-structure)
5. [Safe Deployment Flow](#step-5--safe-deployment-flow)
6. [GitHub Actions CI/CD](#step-6--github-actions-cicd)
7. [Vercel Deployment](#step-7--vercel-deployment)
8. [Project Cleanup](#step-8--project-cleanup)
9. [Final Checks](#step-9--final-checks)

---

## STEP 1 — INITIAL GIT SETUP

### 1.1 Check Git Installation

```bash
# Check if git is installed
git --version

# If not installed, download from: https://git-scm.com/downloads
```

### 1.2 Initialize Git Repository

```bash
# Navigate to project directory
cd C:\Users\User\Pictures\CheryV1

# Initialize git repository
git init

# Verify .git folder created
ls -la | grep .git
```

### 1.3 Configure Git User

```bash
# Set your name and email (use your GitHub credentials)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Verify configuration
git config --list
```

### 1.4 Add Files to Git

```bash
# Add all files
git add .

# Check status
git status

# You should see all files staged for commit
```

### 1.5 Create Initial Commit

```bash
# Create initial commit
git commit -m "chore: initial production-ready setup

- Setup Next.js 14 with TypeScript
- Configure Prisma with PostgreSQL
- Add environment validation with Zod
- Setup security middleware
- Add SEO optimization (sitemap, robots.txt)
- Configure GitHub Actions CI/CD
- Add comprehensive documentation
- Setup Vercel deployment config"

# Verify commit
git log --oneline
```

---

## STEP 2 — CREATE GITHUB REPOSITORY

### 2.1 Create Repository on GitHub

**Option A: Via GitHub Website (Recommended)**

1. Go to https://github.com/new
2. Fill in the details:
   - **Repository name**: `chery-website`
   - **Description**: `Official Chery Indonesia Website - Next.js 14 + TypeScript + Prisma`
   - **Visibility**: Private (recommended) or Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click **Create repository**

**Option B: Via GitHub CLI**

```bash
# Install GitHub CLI first: https://cli.github.com/
gh auth login

# Create repository
gh repo create chery-website --private --description "Official Chery Indonesia Website"

# This will automatically set the remote URL
```

### 2.2 Connect Local to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/chery-website.git

# Verify remote added
git remote -v

# Should show:
# origin  https://github.com/YOUR_USERNAME/chery-website.git (fetch)
# origin  https://github.com/YOUR_USERNAME/chery-website.git (push)
```

### 2.3 Push to GitHub

```bash
# Push to GitHub
git push -u origin main

# If you get error about branch name, use:
git push -u origin master

# Or rename master to main first:
git branch -M main
git push -u origin main
```

### 2.4 Verify on GitHub

1. Go to https://github.com/YOUR_USERNAME/chery-website
2. You should see all your files
3. Check that `.env*` files are NOT visible (they should be in .gitignore)

---

## STEP 3 — BRANCH STRATEGY SETUP

### 3.1 Create Develop Branch

```bash
# Create develop branch from main
git checkout -b develop

# Push to GitHub
git push -u origin develop

# Switch back to main
git checkout main
```

### 3.2 Set Up Branch Protection Rules

**On GitHub Website:**

1. Go to your repository
2. Click **Settings** → **Branches**
3. Click **Add branch protection rule**

**For `main` branch:**
```
Branch name pattern: main
☑ Require a pull request before merging
  ☑ Require approvals: 2
  ☑ Dismiss stale PR approvals
☑ Require status checks to pass
  ☑ lint-and-typecheck
  ☑ test
  ☑ build
  ☑ security
☑ Require linear history
☑ Do not allow bypassing
☑ Do not allow deletions
```

**For `develop` branch:**
```
Branch name pattern: develop
☑ Require a pull request before merging
  ☑ Require approvals: 1
☑ Require status checks to pass
  ☑ lint-and-typecheck
  ☑ test
  ☑ build
```

### 3.3 Branch Workflow Commands

```bash
# Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Work on your feature...
git add .
git commit -m "feat: add new feature"

# Push feature branch
git push origin feature/your-feature-name

# Create PR on GitHub to merge to develop

# After PR merged, update local develop
git checkout develop
git pull origin develop

# Delete feature branch
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

### 3.4 Branch Naming Convention

```
feature/  - New features (feature/add-vehicle-filter)
bugfix/   - Bug fixes (bugfix/fix-login-error)
hotfix/   - Critical production fixes (hotfix/security-patch)
release/  - Release preparation (release/v1.2.0)
```

---

## STEP 4 — ENVIRONMENT STRUCTURE

### 4.1 Environment Files Overview

```
.env.example          # Template (committed to git)
.env.local           # Local development (git-ignored)
.env.development     # Staging environment (git-ignored)
.env.production      # Production (git-ignored, set in Vercel)
```

### 4.2 Create .env.local (Local Development)

Create file: `.env.local`

```env
# ===========================================
# LOCAL DEVELOPMENT
# ===========================================

# Environment
NODE_ENV=development

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Database (SQLite for local dev)
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_SECRET=dev-secret-key-min-32-characters-1234567890
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=admin@chery.com
ADMIN_PASSWORD=your-local-password-here

# Optional: Local Supabase (if needed)
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 4.3 Create .env.development (Staging)

Create file: `.env.development`

```env
# ===========================================
# STAGING ENVIRONMENT
# ===========================================

# Environment
NODE_ENV=production

# Application URLs
NEXT_PUBLIC_APP_URL=https://staging.chery.co.id
NEXT_PUBLIC_API_URL=https://staging.chery.co.id/api

# Database (PostgreSQL for staging)
DATABASE_URL=postgresql://staging_user:password@host:5432/staging_db

# Authentication
NEXTAUTH_SECRET=staging-secret-key-min-32-characters-1234567890
NEXTAUTH_URL=https://staging.chery.co.id

# Admin Credentials
ADMIN_EMAIL=admin@chery.com
ADMIN_PASSWORD=staging-secure-password

# Optional: Supabase
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 4.4 Production Environment (Vercel)

**DO NOT create .env.production file locally!**

Production environment variables are set in:
- **Vercel Dashboard** → Project Settings → Environment Variables

**Required Production Variables:**
```
NODE_ENV=production
DATABASE_URL=postgresql://prod_user:password@host:5432/prod_db
NEXTAUTH_SECRET=<generate-strong-secret>
NEXTAUTH_URL=https://chery.co.id
NEXT_PUBLIC_APP_URL=https://chery.co.id
NEXT_PUBLIC_API_URL=https://chery.co.id/api
ADMIN_EMAIL=admin@chery.com
ADMIN_PASSWORD=<strong-production-password>
```

### 4.5 Environment Usage Guide

| Environment | When Used | Database | URL |
|-------------|-----------|----------|-----|
| `.env.local` | Local development | SQLite | localhost:3000 |
| `.env.development` | Staging (Vercel preview) | PostgreSQL | staging.chery.co.id |
| `.env.production` | Production (Vercel) | PostgreSQL | chery.co.id |

**How Vercel Reads Environment:**
- Production branch (`main`) → Uses Vercel Production env vars
- Preview/Staging (`develop`, PRs) → Uses Vercel Preview env vars
- Local development → Uses `.env.local`

---

## STEP 5 — SAFE DEPLOYMENT FLOW

### 5.1 Deployment Workflow

```
LOCAL DEVELOPMENT
      ↓
  feature/* branch
      ↓
  Pull Request → develop
      ↓
  GitHub Actions (lint, test, build)
      ↓
  Auto-deploy to STAGING (Vercel preview)
      ↓
  Manual testing on staging
      ↓
  Pull Request → main
      ↓
  GitHub Actions (all checks)
      ↓
  Auto-deploy to PRODUCTION (Vercel)
      ↓
  MONITOR & VERIFY
```

### 5.2 Commit Naming Convention

Use **Conventional Commits**:

```bash
# Format: <type>(<scope>): <description>

# Types:
# feat:     New feature
# fix:      Bug fix
# docs:     Documentation
# style:    Code style (formatting)
# refactor: Code refactoring
# perf:     Performance improvement
# test:     Adding tests
# chore:    Maintenance

# Examples:
git commit -m "feat(vehicles): add price filter functionality"
git commit -m "fix(auth): resolve login redirect issue"
git commit -m "docs(readme): update installation steps"
git commit -m "perf(images): optimize image loading"
```

### 5.3 Branch Naming Convention

```bash
# Format: <type>/<ticket-id>-<description>

# Examples:
feature/PROJ-123-add-vehicle-comparison
bugfix/PROJ-456-fix-mobile-navigation
hotfix/PROJ-789-security-patch
release/v1.2.0
```

### 5.4 Testing Before Production

```bash
# 1. Run all checks locally
npm run lint
npm run type-check
npm test
npm run build

# 2. Test on staging
# - Deploy to develop branch
# - Test all features
# - Check performance (Lighthouse)
# - Verify on mobile devices

# 3. Create release PR
# - PR from develop to main
# - Wait for CI/CD checks
# - Get approvals
# - Merge
```

### 5.5 Rollback Strategy

**Quick Rollback (Vercel):**
```bash
# Via Vercel CLI
vercel list
vercel rollback [deployment-url]

# Via Dashboard:
# Deployments → Select previous → Promote to Production
```

**Database Rollback:**
```bash
# Backup first!
pg_dump $DATABASE_URL > backup.sql

# Rollback migration
npx prisma migrate resolve --rolled-back [migration-name]
npx prisma migrate deploy
```

---

## STEP 6 — GITHUB ACTIONS CI/CD

The CI/CD workflow has already been created at `.github/workflows/ci.yml`.

### 6.1 What It Does

```yaml
On every push/PR:
1. Lint & Type Check
2. Run Tests (with PostgreSQL)
3. Build Validation
4. Security Audit

On merge to develop:
- Auto-deploy to STAGING

On merge to main:
- Auto-deploy to PRODUCTION
```

### 6.2 Required GitHub Secrets

Go to: **Repository Settings → Secrets and variables → Actions**

Add these secrets:

```bash
# Vercel
VERCEL_TOKEN=          # Get from: vercel.com/account/tokens
VERCEL_ORG_ID=         # Get from: vercel.com/account
VERCEL_PROJECT_ID_STAGING=    # From Vercel project settings
VERCEL_PROJECT_ID_PRODUCTION= # From Vercel project settings
```

### 6.3 Get Vercel Credentials

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Get project ID from .vercel/project.json
cat .vercel/project.json

# Get org ID from .vercel/vercel.json
cat .vercel/vercel.json
```

---

## STEP 7 — VERCEL DEPLOYMENT

### 7.1 Import Project to Vercel

1. Go to https://vercel.com/new
2. Import `chery-website` repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 7.2 Configure Branches

**Production:**
- Production Branch: `main`
- Auto-deploy: ✅ Enabled

**Preview:**
- Preview Branches: `develop` and `feature/*`
- Auto-deploy: ✅ Enabled

### 7.3 Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

**Production:**
```
NODE_ENV=production
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
NEXTAUTH_URL=https://chery.co.id
NEXT_PUBLIC_APP_URL=https://chery.co.id
NEXT_PUBLIC_API_URL=https://chery.co.id/api
ADMIN_EMAIL=admin@chery.com
ADMIN_PASSWORD=<secure-password>
```

**Preview (Staging):**
```
NODE_ENV=production
DATABASE_URL=postgresql://staging_user:password@host:5432/staging_db
NEXTAUTH_SECRET=<staging-secret>
NEXTAUTH_URL=https://staging.chery.co.id
NEXT_PUBLIC_APP_URL=https://staging.chery.co.id
NEXT_PUBLIC_API_URL=https://staging.chery.co.id/api
ADMIN_EMAIL=admin@chery.com
ADMIN_PASSWORD=<staging-password>
```

### 7.4 Deploy

```bash
# Trigger deployment
git push origin main

# Or via CLI
vercel --prod

# Monitor deployment
vercel logs
```

---

## STEP 8 — PROJECT CLEANUP

### 8.1 Remove Unnecessary Files

```bash
# Remove temporary files
rm -f fix_quiz_page.js
rm -f upgrade_quiz.py
rm -f write_quiz.py
rm -f setup-folders.bat

# Remove old documentation (if duplicates exist)
# Keep only the new docs in docs/ folder

# Remove old seed files if not needed
# rm prisma/seed-hero-slides.ts
# rm prisma/seed.cjs
```

### 8.2 Check for Console.logs

```bash
# Search for console.log in source files
grep -r "console.log" src/ --include="*.ts" --include="*.tsx"

# Remove or comment out console.logs in production code
# Keep only error logging
```

### 8.3 Verify Image Optimization

Check that you're using Next.js Image component:

```typescript
// ✅ GOOD
import Image from 'next/image';
<Image src="/hero.jpg" alt="Hero" width={1920} height={1080} />

// ❌ BAD
<img src="/hero.jpg" alt="Hero" />
```

### 8.4 Verify SEO Metadata

Check that pages have metadata:

```typescript
// app/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chery Indonesia - Official Website',
  description: '...',
};
```

---

## STEP 9 — FINAL CHECKS

### 9.1 Verify .gitignore

```bash
# Check .gitignore contains:
cat .gitignore

# Should include:
# - node_modules
# - .next
# - .env*
# - .vercel
# - prisma/dev.db
# - *.db
```

### 9.2 Test Build Locally

```bash
# Install dependencies
npm install

# Run type check
npm run type-check

# Run linter
npm run lint

# Build project
npm run build

# If build succeeds, you're ready!
```

### 9.3 Create First Production Release

```bash
# Update version in package.json
# Update CHANGELOG.md

# Create release branch
git checkout -b release/v1.0.0

# Commit release
git add .
git commit -m "chore: release v1.0.0"

# Push and create PR to main
git push origin release/v1.0.0

# On GitHub: Create PR release/v1.0.0 → main
# After approval and merge:
git checkout main
git pull origin main
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

---

## 🎯 QUICK START COMMANDS

Copy-paste these commands in order:

```bash
# ============================================
# COMPLETE SETUP - RUN THESE COMMANDS
# ============================================

# 1. Initialize Git
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 2. Add all files
git add .

# 3. Initial commit
git commit -m "chore: initial production-ready setup"

# 4. Create GitHub repo at: https://github.com/new
#    Name: chery-website
#    DO NOT initialize with README

# 5. Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/chery-website.git

# 6. Create and push main branch
git branch -M main
git push -u origin main

# 7. Create develop branch
git checkout -b develop
git push -u origin develop

# 8. Switch back to main
git checkout main

# 9. Setup complete! 🎉
```

---

## 📋 CHECKLIST

- [ ] Git repository initialized
- [ ] Initial commit created
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] `main` branch created
- [ ] `develop` branch created
- [ ] Branch protection rules configured
- [ ] `.env.local` created for local development
- [ ] `.env.development` created for staging
- [ ] Production env vars configured in Vercel
- [ ] Vercel project connected to GitHub
- [ ] GitHub Actions secrets configured
- [ ] First deployment successful
- [ ] Team members added to repository

---

## 🆘 TROUBLESHOOTING

### Git Issues

```bash
# If git add fails
git reset
git add .

# If remote already exists
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/chery-website.git

# If push rejected
git pull origin main --rebase
git push origin main
```

### Permission Denied

```bash
# Use HTTPS instead of SSH (easier)
git remote set-url origin https://github.com/YOUR_USERNAME/chery-website.git

# Or setup SSH: https://docs.github.com/en/authentication
```

### Large Files

```bash
# If you have large files, use Git LFS
git lfs install
git lfs track "*.psd" "*.ai" "*.sketch"
```

---

## 📞 SUPPORT

- GitHub Docs: https://docs.github.com
- Git Handbook: https://guides.github.com/introduction/git-handbook/
- Vercel Docs: https://vercel.com/docs

---

**Ready to deploy! 🚀**