# Chery Indonesia - Official Website

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2d3748)

Website resmi Chery Indonesia dengan fitur lengkap untuk manajemen konten, kendaraan, dealer, dan layanan pelanggan.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.4 (Strict Mode)
- **Styling**: TailwindCSS 3.4
- **Animation**: Framer Motion 12.40
- **Database**: Prisma ORM
- **Database Provider**: 
  - Development: SQLite
  - Production: PostgreSQL (Supabase)
- **Authentication**: NextAuth.js 5.0
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

## 📋 Features

### Public Features
- 🚗 Vehicle Showcase dengan filter & search
- 🎯 Interactive Quiz untuk rekomendasi kendaraan
- 📰 News & Updates
- 🏪 Dealer Locator dengan integrasi Google Maps
- 💰 Financing Calculator
- ❓ FAQ Section
- ⭐ Testimonials
- 📱 Fully Responsive Design

### Admin Features
- 🔐 Secure Authentication
- 📊 Content Management System
- 🚗 Vehicle Management
- 📰 News Management
- 🏪 Dealer Management
- 🎯 Quiz Management
- 📈 Analytics Dashboard
- 👥 Lead Management
- 🖼️ Media Library
- ✅ Revision & Approval System

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── admin/             # Admin Dashboard
│   ├── models/            # Vehicle Model Pages
│   └── (public pages)/    # Public Pages
├── components/
│   ├── ui/                # Reusable UI Components
│   ├── layout/            # Layout Components
│   ├── sections/          # Page Sections
│   ├── animations/        # Framer Motion Animations
│   └── shared/            # Shared Components
├── lib/
│   ├── env.ts            # Environment Configuration
│   ├── prisma.ts         # Prisma Client Singleton
│   └── utils/            # Utility Functions
├── hooks/                # Custom React Hooks
├── services/             # API Services
├── store/                # State Management
├── types/                # TypeScript Definitions
└── config/               # App Configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x atau lebih tinggi
- npm atau yarn
- PostgreSQL (untuk production) atau SQLite (untuk development)

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/your-org/chery-website.git
   cd chery-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` dengan konfigurasi Anda:
   - Untuk development: Gunakan SQLite (`DATABASE_URL="file:./dev.db"`)
   - Untuk production: Gunakan PostgreSQL Supabase

4. **Setup database**
   ```bash
   # Generate Prisma Client
   npm run db:generate
   
   # Run migrations
   npm run db:migrate
   
   # Seed database dengan sample data
   npm run db:seed
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Buka browser**
   
   Navigasi ke [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Type Checking
npm run type-check       # Run TypeScript compiler

# Database
npm run db:generate      # Generate Prisma Client
npm run db:migrate       # Run pending migrations
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio
npm run db:reset         # Reset database (WARNING: deletes all data)
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment mode | Yes |
| `NEXT_PUBLIC_APP_URL` | Public app URL | Yes |
| `DATABASE_URL` | Database connection string | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret key (min 32 chars) | Yes |
| `NEXTAUTH_URL` | NextAuth callback URL | Yes |
| `ADMIN_EMAIL` | Admin email for seeding | Yes |
| `ADMIN_PASSWORD` | Admin password for seeding | Yes |

See [`.env.example`](.env.example) for all available options.

### Database Configuration

**Development (SQLite):**
```env
DATABASE_URL="file:./dev.db"
```

**Production (PostgreSQL/Supabase):**
```env
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

## 🔒 Security

- ✅ Environment variables validation with Zod
- ✅ Type-safe environment access
- ✅ SQL injection prevention via Prisma
- ✅ Password hashing with bcrypt
- ✅ CSRF protection via NextAuth
- ✅ Security headers via middleware
- ✅ Rate limiting support
- ✅ Input sanitization

## 🚢 Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Configure environment variables di Vercel dashboard
4. Deploy!

### Environment Variables di Vercel

**Production:**
- `NODE_ENV=production`
- `DATABASE_URL=<your-supabase-url>`
- `NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>`
- `NEXTAUTH_URL=https://yourdomain.com`
- `NEXT_PUBLIC_APP_URL=https://yourdomain.com`

### Database Migration di Production

```bash
# Run migrations on production database
npx prisma migrate deploy

# Seed production data (optional)
npx prisma db seed
```

## 📚 Documentation

- [Development Guide](docs/DEVELOPMENT_GUIDE.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [GitHub Workflow](docs/GITHUB_WORKFLOW.md)
- [Environment Setup](docs/ENV_SETUP.md)

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Team

- **Development**: Chery Digital Team
- **Design**: Chery Design Team
- **Product**: Chery Product Team

## 📞 Support

For support, email support@chery.co.id or create an issue in this repository.

---

**Built with ❤️ for Chery Indonesia**