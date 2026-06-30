# GitHub Workflow Guide

Panduan lengkap untuk workflow GitHub dan branching strategy di proyek Chery Indonesia Website.

## 📋 Table of Contents

- [Branching Strategy](#branching-strategy)
- [Branch Protection](#branch-protection)
- [Pull Request Process](#pull-request-process)
- [CI/CD Pipeline](#cicd-pipeline)
- [Release Process](#release-process)
- [Best Practices](#best-practices)

## 🌿 Branching Strategy

Kami menggunakan **Git Flow** branching model yang di-adaptasi untuk tim modern:

```
main (production)
  └── develop (staging)
       ├── feature/*
       ├── bugfix/*
       ├── hotfix/*
       └── release/*
```

### Branch Types

#### 1. `main` - Production Branch
- **Purpose**: Kode yang berjalan di production
- **Protection**: Sangat ketat (branch protection rules)
- **Deploy**: Otomatis ke production
- **Merge dari**: `develop` atau `hotfix/*`

#### 2. `develop` - Development Branch
- **Purpose**: Integrasi fitur-fitur baru
- **Protection**: Moderate
- **Deploy**: Otomatis ke staging environment
- **Merge dari**: `feature/*`, `bugfix/*`

#### 3. `feature/*` - Feature Branches
- **Purpose**: Pengembangan fitur baru
- **Naming**: `feature/deskripsi-fitur`
- **Contoh**: `feature/add-vehicle-filter`, `feature/quiz-recommendation`
- **Merge ke**: `develop`

#### 4. `bugfix/*` - Bug Fix Branches
- **Purpose**: Memperbaiki bug di development
- **Naming**: `bugfix/deskripsi-bug`
- **Contoh**: `bugfix/fix-login-redirect`, `bugfix/vehicle-image-error`
- **Merge ke**: `develop`

#### 5. `hotfix/*` - Critical Production Fixes
- **Purpose**: Fix critical issues di production
- **Naming**: `hotfix/deskripsi-issue`
- **Contoh**: `hotfix/security-patch`, `hotfix/payment-error`
- **Merge ke**: `main` dan `develop`

#### 6. `release/*` - Release Branches (Optional)
- **Purpose**: Preparation untuk release
- **Naming**: `release/v1.2.0`
- **Merge ke**: `main` dan `develop`

### Branch Naming Convention

```
<type>/<ticket-id>-<description>

Examples:
feature/PROJ-123-add-vehicle-comparison
bugfix/PROJ-456-fix-mobile-nav
hotfix/PROJ-789-security-vulnerability
release/v1.2.0
```

## 🔒 Branch Protection Rules

### `main` Branch Protection

**Required Settings:**

1. **Require a pull request before merging**
   - Required approvals: 2
   - Dismiss stale PR approvals: Yes
   - Require review from code owners: Yes

2. **Require status checks to pass**
   - lint-and-typecheck
   - test
   - build
   - security

3. **Restrict pushes**
   - Only allow specific users/teams
   - No direct pushes allowed

4. **Additional settings**
   - Require linear history: Yes
   - Allow force pushes: No
   - Allow deletions: No

### `develop` Branch Protection

**Required Settings:**

1. **Require a pull request before merging**
   - Required approvals: 1
   - Dismiss stale PR approvals: Yes

2. **Require status checks to pass**
   - lint-and-typecheck
   - test
   - build

3. **Restrict pushes**
   - Allow maintainers to push

### Setup Branch Protection

**Via GitHub CLI:**

```bash
# Protect main branch
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["lint-and-typecheck","test","build","security"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":2,"dismiss_stale_reviews":true}' \
  --field restrictions='{"users":[],"teams":["maintainers"]}' \
  --field allow_force_pushes=false \
  --field allow_deletions=false
```

**Via GitHub UI:**

1. Go to Repository → Settings → Branches
2. Add rule for `main`
3. Configure settings as above
4. Save changes

## 🔀 Pull Request Process

### 1. Creating a Pull Request

**PR Title Format:**
```
<type>(<scope>): <description>

Examples:
feat(vehicles): add vehicle comparison feature
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
```

**PR Description Template:**

```markdown
## Description
<!-- Describe your changes -->

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Testing
- [ ] Unit tests added
- [ ] Manual testing performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests pass
```

### 2. PR Review Process

**Review Stages:**

1. **Automated Checks** (CI/CD)
   - Linting
   - Type checking
   - Tests
   - Build
   - Security scan

2. **Code Review**
   - At least 1 approval required
   - Code owners review
   - Address all comments

3. **Approval & Merge**
   - All checks pass
   - Approved by reviewers
   - Squash and merge

### 3. Merge Strategy

**Recommended: Squash and Merge**

```bash
# Via GitHub UI
# Click "Squash and merge" button

# Benefits:
# - Clean commit history
# - One commit per feature
# - Easy to revert
```

**Alternative: Rebase and Merge**

```bash
# Benefits:
# - Linear history
# - Preserves all commits
# - Better for debugging
```

## ⚙️ CI/CD Pipeline

### Workflow Overview

```
Push to feature/* → CI checks
     ↓
Create PR → CI checks + Review
     ↓
Merge to develop → Deploy to staging
     ↓
Create release PR → CI checks
     ↓
Merge to main → Deploy to production
```

### GitHub Actions Jobs

#### 1. Lint & Type Check

```yaml
jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
```

#### 2. Test Suite

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15-alpine
        env:
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_password
          POSTGRES_DB: test_db
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx prisma generate
      - run: npx prisma migrate deploy
      - run: npm test
```

#### 3. Build & Validate

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
```

#### 4. Security Audit

```yaml
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm audit --audit-level=moderate
      - run: npm run secrets-scan
```

### Required Status Checks

For PR to be mergeable, all checks must pass:

- ✅ `lint-and-typecheck` - Lint & Type Check
- ✅ `test` - Test Suite
- ✅ `build` - Build & Validate
- ✅ `security` - Security Audit

## 🚀 Release Process

### Version Numbering

We use [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH

Examples:
1.0.0 - Initial release
1.1.0 - New features added
1.1.1 - Bug fixes
2.0.0 - Breaking changes
```

### Release Checklist

1. **Create Release Branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b release/v1.2.0
   ```

2. **Update Version Numbers**
   ```json
   // package.json
   {
     "version": "1.2.0"
   }
   ```

3. **Update CHANGELOG.md**
   ```markdown
   ## [1.2.0] - 2024-01-15
   
   ### Added
   - Vehicle comparison feature
   - New quiz questions
   
   ### Fixed
   - Mobile navigation bug
   - Image loading issue
   ```

4. **Create Release PR**
   ```bash
   git add .
   git commit -m "chore: release v1.2.0"
   git push origin release/v1.2.0
   # Create PR: release/v1.2.0 → main
   ```

5. **Merge & Tag**
   ```bash
   # After PR merged
   git checkout main
   git pull origin main
   git tag -a v1.2.0 -m "Release v1.2.0"
   git push origin v1.2.0
   ```

6. **Merge back to develop**
   ```bash
   git checkout develop
   git merge main
   git push origin develop
   ```

### Automated Release (GitHub Actions)

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: softprops/action-gh-release@v1
        with:
          files: |
            dist/**/*
            CHANGELOG.md
```

## 📝 Commit Convention

Kami menggunakan [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Types

- `feat` - Fitur baru
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (formatting)
- `refactor` - Code refactoring
- `perf` - Performance improvement
- `test` - Adding/updating tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes
- `build` - Build system changes
- `revert` - Revert commit

### Examples

```bash
# Simple commit
git commit -m "feat: add vehicle filter"

# With scope
git commit -m "feat(api): add vehicle search endpoint"

# With body
git commit -m "fix: resolve login redirect issue

The login redirect was not working after authentication.
This fix ensures proper redirect to intended page.

Closes #123"

# Breaking change
git commit -m "feat(api)!: change vehicle API structure

BREAKING CHANGE: Vehicle API now returns nested data.
See docs/MIGRATION.md for migration guide."
```

## 🎯 Best Practices

### DO's ✅

1. **Create feature branches from `develop`**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/my-feature
   ```

2. **Keep PRs small and focused**
   - One feature per PR
   - Easier to review
   - Faster to merge

3. **Write descriptive commit messages**
   ```bash
   # Good
   git commit -m "feat(vehicles): add price range filter"
   
   # Bad
   git commit -m "update"
   ```

4. **Rebase before merging**
   ```bash
   git fetch origin
   git rebase origin/develop
   ```

5. **Delete branches after merge**
   ```bash
   git branch -d feature/my-feature
   git push origin --delete feature/my-feature
   ```

### DON'Ts ❌

1. **Don't commit directly to `main` or `develop`**
   - Always use PRs
   - Always get reviews

2. **Don't force push to shared branches**
   - Avoid `git push --force`
   - Use `git push --force-with-lease`

3. **Don't commit secrets**
   - Use `.env` files
   - Use GitHub Secrets for CI/CD

4. **Don't create massive PRs**
   - Break into smaller PRs
   - Easier to review and test

5. **Don't ignore CI/CD failures**
   - Fix all failing checks
   - Don't merge broken code

## 🔍 Code Review Guidelines

### For Authors

1. **Before Creating PR:**
   - [ ] Self-review your code
   - [ ] Run all tests locally
   - [ ] Update documentation
   - [ ] Add tests for new features

2. **PR Description:**
   - Clear description
   - Link to related issues
   - Screenshots for UI changes
   - Testing instructions

3. **During Review:**
   - Respond to all comments
   - Make requested changes
   - Push updates promptly

### For Reviewers

1. **Review Checklist:**
   - [ ] Code follows standards
   - [ ] Logic is correct
   - [ ] Tests are adequate
   - [ ] Documentation updated
   - [ ] No security issues
   - [ ] Performance considered

2. **Review Comments:**
   - Be constructive
   - Explain reasoning
   - Suggest improvements
   - Approve when satisfied

3. **Approval:**
   - Approve when code is ready
   - Request changes if needed
   - Discuss in person for complex issues

## 📊 Workflow Metrics

Track these metrics to improve workflow:

- **Lead Time**: Time from commit to production
- **Deployment Frequency**: How often you deploy
- **MTTR**: Mean time to recover from failure
- **Change Failure Rate**: % of deployments causing failures

Target (based on DORA metrics):
- Lead Time: < 1 day
- Deployment Frequency: > 1/week
- MTTR: < 1 hour
- Change Failure Rate: < 15%

## 🆘 Troubleshooting

### Merge Conflicts

```bash
# 1. Update your branch
git fetch origin
git rebase origin/develop

# 2. Resolve conflicts
# Edit files to resolve conflicts
git add .
git rebase --continue

# 3. Force push (safe)
git push --force-with-lease
```

### Failed CI Checks

```bash
# 1. Check logs in GitHub Actions
# 2. Fix issues locally
npm run lint
npm run type-check
npm test

# 3. Push fixes
git add .
git commit -m "fix: resolve CI failures"
git push
```

### Accidental Push to Wrong Branch

```bash
# 1. Create new branch from correct commit
git branch feature/my-feature-correct <commit-hash>

# 2. Push correct branch
git push origin feature/my-feature-correct

# 3. Delete wrong branch
git push origin --delete feature/my-feature-wrong
```

## 📚 Additional Resources

- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [DORA Metrics](https://cloud.google.com/blog/products/devops-sre/announcing-dora-2022-accelerate-state-of-devops-report)

---

**Happy Collaborating! 🤝**