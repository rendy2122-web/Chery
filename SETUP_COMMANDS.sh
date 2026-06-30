#!/bin/bash
# ============================================
# CHERY INDONESIA WEBSITE - GITHUB SETUP
# Complete setup script - Run these commands
# ============================================

echo "🚀 Starting GitHub Setup for Chery Indonesia Website..."
echo ""

# ============================================
# STEP 1: INITIALIZE GIT
# ============================================
echo "📦 Step 1: Initializing Git Repository..."
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
echo "✅ Git initialized"
echo ""

# ============================================
# STEP 2: CREATE ENVIRONMENT FILES
# ============================================
echo "🔧 Step 2: Creating environment files..."

# Create .env.local if not exists
if [ ! -f .env.local ]; then
    cat > .env.local << 'EOF'
# ===========================================
# LOCAL DEVELOPMENT
# ===========================================
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET=dev-secret-key-min-32-characters-1234567890
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@chery.com
ADMIN_PASSWORD=your-local-password-here
EOF
    echo "✅ Created .env.local"
fi

# Create .env.development if not exists
if [ ! -f .env.development ]; then
    cat > .env.development << 'EOF'
# ===========================================
# STAGING ENVIRONMENT
# ===========================================
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://staging.chery.co.id
NEXT_PUBLIC_API_URL=https://staging.chery.co.id/api
DATABASE_URL=postgresql://staging_user:password@host:5432/staging_db
NEXTAUTH_SECRET=staging-secret-key-min-32-characters-1234567890
NEXTAUTH_URL=https://staging.chery.co.id
ADMIN_EMAIL=admin@chery.com
ADMIN_PASSWORD=staging-secure-password
EOF
    echo "✅ Created .env.development"
fi

echo ""

# ============================================
# STEP 3: CLEANUP TEMPORARY FILES
# ============================================
echo "🧹 Step 3: Cleaning up temporary files..."
rm -f fix_quiz_page.js
rm -f upgrade_quiz.py
rm -f write_quiz.py
rm -f setup-folders.bat
echo "✅ Temporary files removed"
echo ""

# ============================================
# STEP 4: INITIAL COMMIT
# ============================================
echo "💾 Step 4: Creating initial commit..."
git add .
git commit -m "chore: initial production-ready setup

- Setup Next.js 14 with TypeScript
- Configure Prisma with PostgreSQL
- Add environment validation with Zod
- Setup security middleware
- Add SEO optimization (sitemap, robots.txt)
- Configure GitHub Actions CI/CD
- Add comprehensive documentation
- Setup Vercel deployment config"
echo "✅ Initial commit created"
echo ""

# ============================================
# STEP 5: CREATE BRANCHES
# ============================================
echo "🌿 Step 5: Creating branch structure..."
git checkout -b develop
git push -u origin develop 2>/dev/null || echo "⚠️  Remote not configured yet, skipping push"
git checkout main
echo "✅ Branches created (main, develop)"
echo ""

# ============================================
# DONE!
# ============================================
echo "🎉 Setup complete!"
echo ""
echo "📋 NEXT STEPS:"
echo "1. Create GitHub repository at: https://github.com/new"
echo "   - Name: chery-website"
echo "   - DO NOT initialize with README"
echo ""
echo "2. Add remote and push:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/chery-website.git"
echo "   git push -u origin main"
echo "   git push -u origin develop"
echo ""
echo "3. Setup Vercel:"
echo "   - Go to https://vercel.com/new"
echo "   - Import chery-website repository"
echo "   - Add environment variables"
echo ""
echo "4. Configure GitHub Secrets:"
echo "   - Go to Repository Settings → Secrets"
echo "   - Add VERCEL_TOKEN, VERCEL_ORG_ID, etc."
echo ""
echo "📚 Documentation:"
echo "   - GITHUB_SETUP_GUIDE.md - Complete setup guide"
echo "   - QUICK_START.md - Quick reference"
echo "   - docs/DEPLOYMENT_GUIDE.md - Deployment guide"
echo ""
echo "✨ Your project is ready for professional deployment!"