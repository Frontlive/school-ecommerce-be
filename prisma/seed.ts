import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const isProductOnPromo = () => Math.round(Math.random());

const possiblePromoOptions = [10, 25, 50, 75];

const getPricePromo = () => {
	return possiblePromoOptions[Math.floor(Math.random() * possiblePromoOptions.length)];
};

const products: Prisma.ProductCreateInput[] = Array.from({ length: 25 }).map((_) => ({
	title: faker.commerce.productName(),
	subtitle: faker.commerce.productAdjective(),
	description: faker.commerce.productDescription(),
	price: Number(faker.commerce.price(50, 1000)),
	pricePromo: isProductOnPromo() ? getPricePromo() : null,
	isNew: Boolean(Math.round(Math.random())),
	imageUrl: faker.image.food(1920, 1080, true),
}));

const main = async () => {
	for (const product of products) {
		await prisma.product.create({
			data: product,
		});
	}
	console.log('Seeding finished');
};

(async () => {
	try {
		await main();
		await prisma.$disconnect();
	} catch (e) {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	}
})();
