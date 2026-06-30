import { PrismaClient } from '@prisma/client';
import { isDevelopment, getDatabaseUrl } from './env';

// Prisma singleton pattern to prevent multiple instances in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: isDevelopment
      ? ['query', 'error', 'warn']
      : ['error'],
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  });

if (isDevelopment) globalForPrisma.prisma = prisma;

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

// Health check
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Safe query helpers
export const safeQuery = {
  // Prevent SQL injection by using parameterized queries
  findById: async <T>(
    model: string,
    id: string
  ): Promise<T | null> => {
    const validModels = [
      'User', 'Vehicle', 'Promotion', 'Dealer', 'News', 
      'Faq', 'Lead', 'Hero', 'HeroSlide', 'Technology',
      'Testimonial', 'Ownership', 'Financing', 'Revision',
      'Media', 'QuizQuestion', 'QuizAnswer', 'QuizResult',
      'FinalCta', 'GlobalSeo', 'Session'
    ];
    
    if (!validModels.includes(model)) {
      throw new Error(`Invalid model: ${model}`);
    }

    // Use type assertion to safely access the model
    const prismaModel = (prisma as any)[model.toLowerCase()];
    if (!prismaModel) {
      throw new Error(`Model ${model} not found`);
    }

    return prismaModel.findUnique({
      where: { id },
    });
  },

  // Pagination helper
  paginate: async <T>(
    model: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: T[]; total: number; pages: number }> => {
    const skip = (page - 1) * limit;
    const prismaModel = (prisma as any)[model.toLowerCase()];
    
    if (!prismaModel) {
      throw new Error(`Model ${model} not found`);
    }

    const [data, total] = await Promise.all([
      prismaModel.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prismaModel.count(),
    ]);

    return {
      data,
      total,
      pages: Math.ceil(total / limit),
    };
  },
};

export default prisma;