# Quick Start Guide

Panduan cepat untuk setup dan menjalankan proyek Chery Indonesia Website.

## ⚡ 5-Minute Setup

### 1. Clone & Install (1 minute)
```bash
git clone https://github.com/your-org/chery-website.git
cd chery-website
npm install
```

### 2. Environment Setup (1 minute)
```bash
# Copy environment template
cp .env.example .env.local

# Generate secret key
openssl rand -base64 32

# Edit .env.local dengan secret yang di-generate
# Minimal yang dibutuhkan:
# - NEXTAUTH_SECRET=<your-generated-secret>
# - ADMIN_PASSWORD=<your-password>
```

### 3. Database Setup (2 minutes)
```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database dengan sample data
npm run db:seed
```

### 4. Start Development (1 minute)
```bash
npm run dev
```

### 5. Access Application
```
Frontend: http://localhost:3000
Admin Panel: http://localhost:3000/admin
```

**Default Admin Credentials:**
- Email: `admin@chery.com`
- Password: (yang Anda set di .env.local)

## 📚 Essential Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter
npm run type-check       # Check TypeScript

# Database
npm run db:generate      # Generate Prisma Client
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio
npm run db:reset         # Reset database

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
```

## 🗂️ Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── api/         # API endpoints
│   ├── admin/       # Admin dashboard
│   └── page.tsx     # Homepage
├── components/      # React components
├── lib/            # Utilities & config
│   ├── env.ts      # Environment config
│   └── prisma.ts   # Database client
└── types/          # TypeScript types

prisma/
├── schema.prisma   # Database schema
└── seed.ts         # Seed data
```

## 🔧 Common Tasks

### Add New Vehicle
```typescript
// Via Admin Panel: /admin/dashboard/vehicles/new
// Or via API: POST /api/vehicles
```

### Update Content
```typescript
// Via Admin Panel
// All content is manageable through admin dashboard
```

### Run Database Migrations
```bash
# Create new migration
npm run db:migrate -- --name add_new_field

# Apply migrations
npm run db:migrate
```

## 🚀 Deployment

### Deploy to Vercel (1 click)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 📖 Documentation

- [Development Guide](docs/DEVELOPMENT_GUIDE.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [GitHub Workflow](docs/GITHUB_WORKFLOW.md)
- [Environment Setup](docs/ENV_SETUP.md)
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md)

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Database Issues
```bash
# Reset database
npm run db:reset

# Regenerate Prisma Client
npm run db:generate
```

### TypeScript Errors
```bash
# Clear cache
rm -rf .next tsconfig.tsbuildinfo

# Restart
npm run dev
```

## 💡 Tips

1. **Always run `npm run db:generate`** after changing `prisma/schema.prisma`
2. **Use `.env.local`** for local development, never commit secrets
3. **Check the docs** before asking for help
4. **Run tests** before committing changes
5. **Use conventional commits** for clear history

## 🎯 Next Steps

1. ✅ Setup complete!
2. Customize content di Admin Panel
3. Add your branding (logo, colors)
4. Configure production environment
5. Deploy to production

## 📞 Support

- Documentation: [docs/](docs/)
- Issues: [GitHub Issues](https://github.com/your-org/chery-website/issues)
- Email: support@chery.co.id

---

**Ready to build! 🚀**