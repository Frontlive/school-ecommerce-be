import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySensible from '@fastify/sensible';
import { dbPlugin } from './plugins/db/db.plugin';
import { usersPlugin } from './plugins/users/users.plugin';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { graphQLPlugin } from './plugins/graphQL/graphQL.plugin';
import { oAuthPlugin } from './plugins/oAuth/oAuth.plugin';
import { sessionsPlugin } from './plugins/sessions/sessions.plugin';

export const app = fastify({
	logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(fastifySwagger, { routePrefix: '/documentation' });
app.register(dbPlugin);
app.register(fastifySensible);
app.register(oAuthPlugin);
app.register(sessionsPlugin);
app.register(usersPlugin, { prefix: 'api/users' });
app.register(graphQLPlugin);
