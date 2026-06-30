# Contributing to Chery Indonesia Website

Terima kasih atas minat Anda untuk berkontribusi pada proyek ini! Dokumen ini menjelaskan proses dan pedoman untuk berkontribusi.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)

## 🤝 Code of Conduct

Proyek ini mengikuti [Contributor Covenant](https://www.contributor-covenant.org/). Berpartisipasi berarti Anda mematuhi kode etik ini.

## 🚀 Getting Started

### 1. Fork Repository

Fork repository ini ke akun GitHub Anda.

### 2. Clone Repository

```bash
git clone https://github.com/your-username/chery-website.git
cd chery-website
```

### 3. Setup Development Environment

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Setup database
npm run db:generate
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

### 4. Create Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

## 🔄 Development Workflow

### Branch Strategy

Kami menggunakan **Git Flow** branching strategy:

```
main (production)
  └── develop (staging/development)
       └── feature/* (new features)
       └── bugfix/* (bug fixes)
       └── hotfix/* (critical production fixes)
```

**Branch Naming Convention:**
- `feature/` - Fitur baru (contoh: `feature/add-vehicle-filter`)
- `bugfix/` - Bug fixes (contoh: `bugfix/fix-login-redirect`)
- `hotfix/` - Critical fixes untuk production (contoh: `hotfix/security-patch`)
- `refactor/` - Code refactoring (contoh: `refactor/optimize-queries`)
- `docs/` - Documentation updates (contoh: `docs/update-api-docs`)

### Workflow Steps

1. **Create branch dari `develop`**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature
   ```

2. **Make changes**
   - Write clean, maintainable code
   - Follow coding standards
   - Add tests if applicable
   - Update documentation

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add vehicle filter functionality"
   ```

4. **Push branch**
   ```bash
   git push origin feature/your-feature
   ```

5. **Create Pull Request**
   - Buat PR ke branch `develop`
   - Isi template PR dengan lengkap
   - Assign reviewers
   - Wait for CI/CD checks

6. **Code Review**
   - Address review comments
   - Make requested changes
   - Push updates

7. **Merge**
   - Setelah approved, PR akan di-merge ke `develop`
   - Branch feature akan di-delete otomatis

## 📝 Commit Convention

Kami menggunakan [Conventional Commits](https://www.conventionalcommits.org/) untuk message commit yang jelas dan konsisten.

### Format

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
- `docs` - Documentation changes
- `style` - Code style changes (formatting, missing semicolons, etc)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes
- `build` - Build system changes
- `revert` - Revert previous commit

### Examples

```bash
# Simple feat commit
git commit -m "feat: add vehicle comparison feature"

# With scope
git commit -m "feat(api): add vehicle search endpoint"

# With body
git commit -m "fix: resolve login redirect issue

The login redirect was not working properly after authentication.
This fix ensures users are redirected to their intended destination.

Closes #123"

# Breaking change
git commit -m "feat(api)!: change vehicle API response structure

BREAKING CHANGE: The vehicle API now returns nested data structure.
Migration guide available in docs/MIGRATION.md"
```

### Semantic Commit Examples

```bash
# Features
feat: add dark mode support
feat(admin): implement bulk delete for vehicles
feat(api): add rate limiting to auth endpoints

# Bug Fixes
fix: resolve memory leak in hero slideshow
fix(forms): correct validation error messages
fix(prisma): update database connection pooling

# Documentation
docs: update API documentation
docs: add deployment guide for Vercel

# Refactoring
refactor: optimize database queries for vehicles
refactor: extract reusable form components

# Performance
perf: implement image lazy loading
perf: reduce bundle size by 15%

# Testing
test: add unit tests for auth service
test: update integration tests for API

# Maintenance
chore: upgrade dependencies to latest versions
chore: cleanup unused components
```

## 🔀 Pull Request Process

### 1. PR Requirements

Sebelum membuat PR, pastikan:

- [ ] Code follows project coding standards
- [ ] All tests pass (`npm test`)
- [ ] TypeScript type check passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Documentation updated if needed
- [ ] Commit messages follow convention

### 2. PR Template

Gunakan template berikut untuk PR:

```markdown
## Description
<!-- Describe your changes -->

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issues
<!-- Link to related issues: Closes #123, Fixes #456 -->

## Testing
<!-- Describe testing performed -->

## Screenshots
<!-- Add screenshots if applicable -->

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

### 3. Review Process

1. **Automated Checks**: CI/CD akan menjalankan automated checks
2. **Code Review**: Minimal 1 reviewer harus approve
3. **Address Feedback**: Perbaiki semua feedback dari reviewers
4. **Approval**: Setelah approved, PR bisa di-merge
5. **Merge**: Maintainer akan merge PR ke branch target

### 4. After Merge

- Branch Anda akan di-delete otomatis
- Pull perubahan dari `develop` ke branch lokal Anda
- Bikin branch baru untuk fitur selanjutnya

## 💻 Coding Standards

### TypeScript

```typescript
// ✅ GOOD: Use explicit types
interface User {
  id: string;
  email: string;
  name: string;
}

const getUser = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};

// ❌ BAD: Implicit any types
const getUser = async (id) => {
  return await prisma.user.findUnique({ where: { id } });
};
```

### React Components

```typescript
// ✅ GOOD: Functional components with TypeScript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary' 
}: ButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
};

// ❌ BAD: No types, no props interface
export const Button = (props) => {
  return <button onClick={props.onClick}>{props.children}</button>;
};
```

### File Naming

- Components: `PascalCase.tsx` (contoh: `VehicleCard.tsx`)
- Utilities: `camelCase.ts` (contoh: `formatDate.ts`)
- Types: `camelCase.ts` atau `index.ts` (contoh: `vehicle.ts`)
- API Routes: `route.ts` (Next.js convention)

### Import Order

```typescript
// 1. React & Next.js
import React from 'react';
import { NextPage } from 'next';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { PrismaClient } from '@prisma/client';

// 3. Internal components
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/layout/Header';

// 4. Internal utilities
import { formatDate } from '@/lib/utils';
import { prisma } from '@/lib/prisma';

// 5. Types
import type { Vehicle } from '@/types/vehicle';

// 6. Styles
import styles from './VehicleCard.module.css';
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- VehicleCard.test.tsx
```

### Writing Tests

```typescript
// VehicleCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { VehicleCard } from './VehicleCard';

describe('VehicleCard', () => {
  const mockVehicle = {
    id: '1',
    name: 'Tiggo 7 Pro',
    priceFrom: 350000000,
  };

  it('renders vehicle name', () => {
    render(<VehicleCard vehicle={mockVehicle} />);
    expect(screen.getByText('Tiggo 7 Pro')).toBeInTheDocument();
  });

  it('formats price correctly', () => {
    render(<VehicleCard vehicle={mockVehicle} />);
    expect(screen.getByText('Rp 350.000.000')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<VehicleCard vehicle={mockVehicle} onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## ❓ Questions?

Jika Anda memiliki pertanyaan, silakan:

1. Check [documentation](docs/)
2. Search [existing issues](https://github.com/your-org/chery-website/issues)
3. Create new issue dengan label `question`

## 🙏 Thank You!

Terima kasih telah berkontribusi pada proyek ini. Setiap kontribusi, besar atau kecil, sangat berarti!

---

**Happy Coding! 🚀**