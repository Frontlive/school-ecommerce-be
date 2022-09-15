import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const products: Prisma.ProductCreateInput[] = Array.from({ length: 25 }).map((_) => ({
    title: faker.commerce.productName(),
}));
