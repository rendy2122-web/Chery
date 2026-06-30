@echo off
REM ============================================
REM CHERY INDONESIA WEBSITE - GITHUB SETUP
REM Windows Batch Script - Run as Administrator
REM ============================================

echo.
echo ========================================
echo  CHERY INDONESIA WEBSITE - GITHUB SETUP
echo ========================================
echo.

REM ============================================
REM STEP 1: INITIALIZE GIT
REM ============================================
echo [STEP 1/6] Initializing Git Repository...
echo.

git init
if %errorlevel% neq 0 (
    echo ❌ Git init failed. Please install Git first.
    pause
    exit /b 1
)

git config user.name "Your Name"
git config user.email "your.email@example.com"

echo.
echo ✅ Git initialized successfully
echo.

REM ============================================
REM STEP 2: CREATE ENVIRONMENT FILES
REM ============================================
echo [STEP 2/6] Creating environment files...
echo.

if not exist .env.local (
    echo # =========================================== > .env.local
    echo # LOCAL DEVELOPMENT >> .env.local
    echo # =========================================== >> .env.local
    echo. >> .env.local
    echo # Environment >> .env.local
    echo NODE_ENV=development >> .env.local
    echo. >> .env.local
    echo # Application URLs >> .env.local
    echo NEXT_PUBLIC_APP_URL=http://localhost:3000 >> .env.local
    echo NEXT_PUBLIC_API_URL=http://localhost:3000/api >> .env.local
    echo. >> .env.local
    echo # Database ^(SQLite for local dev^) >> .env.local
    echo DATABASE_URL="file:./dev.db" >> .env.local
    echo. >> .env.local
    echo # Authentication >> .env.local
    echo NEXTAUTH_SECRET=dev-secret-key-min-32-characters-1234567890 >> .env.local
    echo NEXTAUTH_URL=http://localhost:3000 >> .env.local
    echo. >> .env.local
    echo # Admin Credentials >> .env.local
    echo ADMIN_EMAIL=admin@chery.com >> .env.local
    echo ADMIN_PASSWORD=your-local-password-here >> .env.local
    echo ✅ Created .env.local
) else (
    echo ⚠️  .env.local already exists, skipping
)

if not exist .env.development (
    echo # =========================================== > .env.development
    echo # STAGING ENVIRONMENT >> .env.development
    echo # =========================================== >> .env.development
    echo. >> .env.development
    echo # Environment >> .env.development
    echo NODE_ENV=production >> .env.development
    echo. >> .env.development
    echo # Application URLs >> .env.development
    echo NEXT_PUBLIC_APP_URL=https://staging.chery.co.id >> .env.development
    echo NEXT_PUBLIC_API_URL=https://staging.chery.co.id/api >> .env.development
    echo. >> .env.development
    echo # Database ^(PostgreSQL for staging^) >> .env.development
    echo DATABASE_URL=postgresql://staging_user:password@host:5432/staging_db >> .env.development
    echo. >> .env.development
    echo # Authentication >> .env.development
    echo NEXTAUTH_SECRET=staging-secret-key-min-32-characters-1234567890 >> .env.development
    echo NEXTAUTH_URL=https://staging.chery.co.id >> .env.development
    echo. >> .env.development
    echo # Admin Credentials >> .env.development
    echo ADMIN_EMAIL=admin@chery.com >> .env.development
    echo ADMIN_PASSWORD=staging-secure-password >> .env.development
    echo ✅ Created .env.development
) else (
    echo ⚠️  .env.development already exists, skipping
)

echo.

REM ============================================
REM STEP 3: CLEANUP TEMPORARY FILES
REM ============================================
echo [STEP 3/6] Cleaning up temporary files...
echo.

if exist fix_quiz_page.js del fix_quiz_page.js
if exist upgrade_quiz.py del upgrade_quiz.py
if exist write_quiz.py del write_quiz.py
if exist setup-folders.bat del setup-folders.bat

echo ✅ Temporary files removed
echo.

REM ============================================
REM STEP 4: INITIAL COMMIT
REM ============================================
echo [STEP 4/6] Creating initial commit...
echo.

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

if %errorlevel% neq 0 (
    echo ❌ Git commit failed
    pause
    exit /b 1
)

echo.
echo ✅ Initial commit created
echo.

REM ============================================
REM STEP 5: CREATE BRANCHES
REM ============================================
echo [STEP 5/6] Creating branch structure...
echo.

git checkout -b develop
echo ✅ Created 'develop' branch

echo.
echo ========================================
echo  SETUP COMPLETE!
echo ========================================
echo.
echo 📋 NEXT STEPS:
echo.
echo 1. Create GitHub repository:
echo    - Go to: https://github.com/new
echo    - Repository name: chery-website
echo    - Description: Official Chery Indonesia Website
echo    - Visibility: Private (recommended)
echo    - DO NOT initialize with README, .gitignore, or license
echo    - Click "Create repository"
echo.
echo 2. Connect and push to GitHub:
echo    git remote add origin https://github.com/YOUR_USERNAME/chery-website.git
echo    git push -u origin main
echo    git push -u origin develop
echo.
echo 3. Setup Vercel:
echo    - Go to: https://vercel.com/new
echo    - Import "chery-website" repository
echo    - Configure environment variables
echo    - Deploy!
echo.
echo 4. Configure GitHub Secrets:
echo    - Repository Settings ^> Secrets and variables ^> Actions
echo    - Add: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
echo.
echo 📚 Documentation:
echo    - GITHUB_SETUP_GUIDE.md - Complete setup guide
echo    - QUICK_START.md - Quick reference
echo    - docs/DEPLOYMENT_GUIDE.md - Deployment guide
echo    - DEPLOYMENT_CHECKLIST.md - Pre-deployment checklist
echo.
echo ✨ Your project is ready for professional deployment!
echo.
pause

</parameter>
<task_progress>
- [x] Analyze current project structure
- [x] Setup Git branching structure and documentation
- [x] Create environment separation with type-safe validation
- [x] Configure Prisma with SQLite/PostgreSQL auto-switch
- [x] Setup GitHub Actions CI/CD workflow
- [x] Reorganize project structure for scalability
- [x] Implement security setup
- [x] Add production optimization (SEO, sitemap, etc.)
- [x] Prepare deployment configuration
- [x] Generate comprehensive documentation
</task_progress>
</write_to_file>