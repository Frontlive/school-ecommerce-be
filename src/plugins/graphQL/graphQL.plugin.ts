import fp from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';
import { createServer } from '@graphql-yoga/node';
import { EnvelopArmor } from '@escape.tech/graphql-armor';
import { makeSchema, objectType, queryField, scalarType, stringArg } from 'nexus';
import { join } from 'node:path';
import * as url from 'node:url';
import { createContext, FastifyContext, UserContext } from './createContext';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const schema = makeSchema({
	types: [],
	outputs: {
		schema: join(__dirname, '..', '..', 'schema.graphql'),
	},
	plugins: [],
});

const armor = new EnvelopArmor();
const protection = armor.protect();

export const graphQLPlugin: FastifyPluginAsync = fp(async (server) => {
	const graphQLServer = createServer<FastifyContext, UserContext, { helloWorld: string }>({
		schema,
		plugins: [...protection.plugins],
		context: createContext,
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
