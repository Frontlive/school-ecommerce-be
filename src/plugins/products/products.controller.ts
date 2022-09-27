import { RouteHandler } from 'fastify';

export const getAllProductsHandler: RouteHandler<ProductsRoute> = async (req, reply) => {
	const { prisma } = req.server;
	const { phrase } = req.query;

	const products = req.server.getAllProducts(phrase);
};
