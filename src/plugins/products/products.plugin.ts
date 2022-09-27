import { FastifyPluginAsync } from 'fastify';
import { getAllProductsHandler } from './products.controller';
import { getAllProducts } from './products.service';

declare module 'fastify' {
	interface FastifyInstance {
		getAllProducts: (phrase?: string) => Promise<void>;
	}
}

export const productsPlugin: FastifyPluginAsync = async (fastify) => {
	fastify.decorate('getAllProducts', getAllProducts(fastify.prisma));

	fastify.get<ProductsRoute>('/', getAllProductsHandler);
};
