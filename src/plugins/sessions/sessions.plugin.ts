import { FastifyPluginAsync } from 'fastify';

export const sessionsPlugin: FastifyPluginAsync = async (fastify) => {
	fastify.get('/connect/github/callback', async (req) => {
		console.log(req.session);
		return req.session;
	});
};
