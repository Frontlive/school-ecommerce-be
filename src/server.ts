import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import { dbPlugin } from './plugins/db/db.plugin';
import { usersPlugin } from './plugins/users/users.plugin';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export const app = fastify({
	logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(fastifySwagger, { routePrefix: '/documentation' });
app.register(dbPlugin);
app.register(usersPlugin, { prefix: 'api/users' });
