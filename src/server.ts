import fastify from 'fastify';
import fastifyAutoload from '@fastify/autoload';
import fastifySwagger from '@fastify/swagger';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const app = fastify({
	logger: true,
});

app.register(fastifyAutoload, {
	dir: join(__dirname, 'plugins'),
	forceESM: true,
});
app.register(fastifySwagger, { routePrefix: '/documentation' });
app.get('/', (_, reply) => {
	reply.send('hello frontlive');
});
