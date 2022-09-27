import fp from 'fastify-plugin';
import fastifyCookie from '@fastify/cookie';
import session from '@fastify/session';
import grant from 'grant';
import ms from 'ms';

export const oAuthPlugin = fp(async (fastify) => {
	return fastify
		.register(fastifyCookie)
		.register(session, {
			secret: String(process.env.SESSION_COOKIE),
			cookie: {
				maxAge: ms('30 days'),
				secure: false,
				httpOnly: false,
			},
		})
		.register(
			grant.fastify()({
				defaults: {
					transport: 'session',
					origin: process.env.BASE_URL,
				},
				github: {
					key: process.env.CLIENT_ID,
					secret: process.env.CLIENT_SECRET,
					callback: '/connect/github/callback',
					response: ['tokens', 'profile'],
					scope: ['user:email'],
				},
			}),
		);
});
