import { FastifyInstance } from 'fastify';
export const addNewUser =
	(fastify: FastifyInstance) =>
	async ({ username, password }: { username: string; password: string }) => {
		await fastify.prisma.user.create({
			data: {
				username,
				password,
			},
		});
	};
