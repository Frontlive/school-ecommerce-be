import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
	interface FastifyInstance {
		prisma: PrismaClient;
	}
}
export const dbPlugin: FastifyPluginAsync = fp(async (server) => {
	const prisma = new PrismaClient();

	await prisma.$connect();

	server.decorate('prisma', prisma);

	server.addHook('onClose', async (server) => {
		await server.prisma.$disconnect();
	});
});
