import { PrismaClient } from '@prisma/client';

export const getAllProducts = (prisma: PrismaClient) => async (phrase?: string) => {
	if (phrase) {
		const productsWithQuery = await prisma.product.findMany({
			where: {
				title: phrase,
			},
		});
		return productsWithQuery;
	}

	const products = await prisma.product.findMany();
	return products;
};
