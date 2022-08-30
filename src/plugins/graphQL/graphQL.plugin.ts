import fp from 'fastify-plugin';
import type { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { createServer } from '@graphql-yoga/node';
import { makeSchema, objectType, queryField } from 'nexus';
import { join } from 'node:path';
import * as url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const helloWorldField = objectType({
	name: 'HelloWorld',
	definition(t) {
		t.string('hello');
		t.boolean('dupa');
	},
});

const query = queryField('helloWorld', {
	type: helloWorldField,
	resolve() {
		return { hello: 'HELLO', dupa: true };
	},
});

const schema = makeSchema({
	types: [query],
	outputs: {
		schema: join(__dirname, '..', '..', 'schema.graphql'),
	},
	plugins: [],
});

export const graphQLPlugin: FastifyPluginAsync = fp(async (server) => {
	const graphQLServer = createServer<{
		req: FastifyRequest;
		reply: FastifyReply;
	}>({
		schema,
		logging: {
			debug: (...args) => args.forEach((arg) => server.log.debug(arg)),
			info: (...args) => args.forEach((arg) => server.log.info(arg)),
			warn: (...args) => args.forEach((arg) => server.log.warn(arg)),
			error: (...args) => args.forEach((arg) => server.log.error(arg)),
		},
	});

	server.route({
		url: '/graphql',
		method: ['GET', 'POST', 'OPTIONS'],
		async handler(req, reply) {
			const response = await graphQLServer.handleIncomingMessage(req, {
				req,
				reply,
			});
			response.headers.forEach((value, key) => {
				reply.header(key, value);
			});

			reply.status(response.status);

			reply.send(response.body);

			return reply;
		},
	});
});
