# Development Guide

Panduan lengkap untuk mengembangkan proyek Chery Indonesia Website.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Database Management](#database-management)
- [Testing](#testing)
- [Code Style](#code-style)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

Pastikan Anda memiliki software berikut terinstall:

- **Node.js** 20.x atau lebih tinggi ([Download](https://nodejs.org/))
- **npm** atau **yarn** (package manager)
- **Git** ([Download](https://git-scm.com/))
- **VS Code** (recommended IDE) ([Download](https://code.visualstudio.com/))

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "prisma.prisma",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## 🚀 Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-org/chery-website.git
cd chery-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local dengan konfigurasi Anda
```

**Minimal configuration untuk development:**

```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET=your-secret-key-min-32-chars
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@chery.com
ADMIN_PASSWORD=your-secure-password
```

### 4. Database Setup

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database dengan sample data
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes (RESTful)
│   │   ├── auth/            # Authentication endpoints
│   │   ├── vehicles/        # Vehicle CRUD
│   │   ├── dealers/         # Dealer management
│   │   ├── news/            # News management
│   │   └── ...
│   ├── admin/               # Admin Dashboard
│   │   ├── (dashboard)/     # Protected admin pages
│   │   ├── login/           # Admin login
│   │   └── layout.tsx       # Admin layout
│   ├── models/              # Vehicle model pages
│   │   └── [slug]/          # Dynamic vehicle pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # Robots.txt
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── layout/              # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/            # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── VehicleSection.tsx
│   │   └── ...
│   ├── animations/          # Framer Motion animations
│   └── shared/              # Shared components
├── lib/
│   ├── env.ts               # Environment configuration
│   ├── prisma.ts            # Prisma client singleton
│   ├── auth.ts              # Authentication helpers
│   ├── utils.ts             # Utility functions
│   └── validations/         # Zod schemas
├── hooks/                   # Custom React hooks
│   ├── useVehicles.ts
│   ├── useAuth.ts
│   └── ...
├── services/                # API service layer
│   ├── vehicle.service.ts
│   ├── auth.service.ts
│   └── ...
├── store/                   # State management
│   ├── slices/
│   └── index.ts
├── types/                   # TypeScript definitions
│   ├── vehicle.ts
│   ├── user.ts
│   └── index.ts
└── config/                  # App configuration
    ├── constants.ts
    └── routes.ts
```

## 🔄 Development Workflow

### 1. Create Feature Branch

```bash
# Update local main branch
git checkout main
git pull origin main

# Create feature branch dari develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Write clean, maintainable code
- Follow TypeScript strict mode
- Use existing components when possible
- Add proper error handling
- Update types if needed

### 3. Test Your Changes

```bash
# Run development server
npm run dev

# Run type check
npm run type-check

# Run linter
npm run lint

# Run tests (jika ada)
npm test
```

### 4. Commit Changes

```bash
# Stage changes
git add .

# Commit dengan conventional commit
git commit -m "feat: add vehicle filter functionality"
```

### 5. Push & Create PR

```bash
# Push branch
git push origin feature/your-feature-name

# Create PR ke branch develop
```

## 🗄️ Database Management

### Prisma Commands

```bash
# Generate Prisma Client setelah ubah schema
npm run db:generate

# Create dan apply migration baru
npm run db:migrate

# Seed database dengan sample data
npm run db:seed

# Open Prisma Studio (GUI untuk database)
npm run db:studio

# Reset database (HATI-HATI: hapus semua data)
npm run db:reset

# Apply migrations tanpa interactive mode (untuk CI/CD)
npm run db:deploy
```

### Database Schema

Edit `prisma/schema.prisma` untuk mengubah database schema:

```prisma
model Vehicle {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  // ... fields lainnya
}
```

Setelah edit schema:

```bash
# 1. Generate migration
npm run db:migrate -- --name add_vehicle_field

# 2. Apply migration
npm run db:migrate

# 3. Regenerate Prisma Client
npm run db:generate
```

### Seeding Data

Edit `prisma/seed.ts` untuk menambahkan sample data:

```typescript
const vehicles = [
  {
    name: 'New Vehicle',
    slug: 'new-vehicle',
    // ... fields lainnya
  },
];

for (const vehicle of vehicles) {
  await prisma.vehicle.create({
    data: vehicle,
  });
}
```

Kemudian jalankan:

```bash
npm run db:seed
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
// components/VehicleCard.test.tsx
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

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<VehicleCard vehicle={mockVehicle} onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 💻 Code Style

### TypeScript

```typescript
// ✅ GOOD: Explicit types
interface User {
  id: string;
  email: string;
  name: string;
}

const getUser = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};

// ❌ BAD: Implicit any
const getUser = async (id) => {
  return await prisma.user.findUnique({ where: { id } });
};
```

### React Components

```typescript
// ✅ GOOD: Functional component with types
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
    <button onClick={onClick} className={`btn-${variant}`}>
      {children}
    </button>
  );
};
```

### File Naming

- **Components**: `PascalCase.tsx` → `VehicleCard.tsx`
- **Utilities**: `camelCase.ts` → `formatDate.ts`
- **Types**: `camelCase.ts` → `vehicle.ts`
- **API Routes**: `route.ts` (Next.js convention)

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

## 📝 Common Tasks

### Adding a New API Route

```typescript
// src/app/api/vehicles/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { active: true },
    });
    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const vehicle = await prisma.vehicle.create({
      data: body,
    });
    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create vehicle' },
      { status: 500 }
    );
  }
}
```

### Adding a New Page

```typescript
// src/app/new-page/page.tsx
import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'New Page',
  description: 'Description of new page',
};

export default function NewPage() {
  return (
    <Container>
      <h1>New Page</h1>
      <p>Content here...</p>
    </Container>
  );
}
```

### Using Prisma in Components

```typescript
'use client';

import { useEffect, useState } from 'react';
import { prisma } from '@/lib/prisma';
import type { Vehicle } from '@/types/vehicle';

export function VehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const res = await fetch('/api/vehicles');
        const data = await res.json();
        setVehicles(data);
      } catch (error) {
        console.error('Failed to fetch vehicles:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {vehicles.map((vehicle) => (
        <div key={vehicle.id}>{vehicle.name}</div>
      ))}
    </div>
  );
}
```

## 🔍 Troubleshooting

### Database Connection Issues

```bash
# Check if DATABASE_URL is correct
echo $DATABASE_URL

# Reset database
npm run db:reset

# Check Prisma status
npx prisma status
```

### TypeScript Errors

```bash
# Clear TypeScript cache
rm -rf .next tsconfig.tsbuildinfo

# Run type check
npm run type-check
```

### Port Already in Use

```bash
# Use different port
npm run dev -- -p 3001

# Or kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma Client
npm run db:generate
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## ❓ Need Help?

- Check [existing documentation](docs/)
- Search [GitHub Issues](https://github.com/your-org/chery-website/issues)
- Create new issue dengan label `question`
- Contact development team

---

**Happy Coding! 🚀**