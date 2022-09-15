import { FastifyPluginAsync } from 'fastify';
import fetch from 'node-fetch';
import consola from 'consola';

type CallbackUrlSchema = {
	Querystring:
		| { code: string; access_token?: undefined }
		| { access_token: string; code?: undefined };
};

export const sessionsPlugin: FastifyPluginAsync = async (fastify) => {
	fastify.get<CallbackUrlSchema>('/connect/github/callback', async (req) => {
		if (req.query.code) {
			consola.success('CODE', req.query.code);

			const params = new URLSearchParams();

			params.append('client_id', String(process.env.GITHUB_CLIENT_ID));
			params.append('client_secret', String(process.env.GITHUB_CLIENT_SECRET));
			params.append('code', req.query.code);
			params.append('redirect_uri', `${process.env.BASE_URL}/connect/github/callback`);

			consola.warn(params.toString());

			const response = await fetch(
				`https://github.com/login/oauth/access_token?${params.toString()}`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
					},
				},
			);

			const data = (await response.json()) as { access_token: string };

			const userResponse = await fetch('https://api.github.com/user', {
				headers: {
					Authorization: `Bearer ${data.access_token}`,
				},
			});

			const user = await userResponse.json();

			consola.success('DATA', user);
			consola.success('SESSION', req.session);

			return req.session;
		} else {
			consola.success('ACCESS TOKEN', req.query.access_token);
			return req.session;
		}
	});
};
