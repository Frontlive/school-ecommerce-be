import fastify from 'fastify';
import fastifyAutoload from '@fastify/autoload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const app = fastify({
	logger: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.register(fastifyAutoload, { dir: join(__dirname, 'plugins') });

app.get('/', (_, reply) => {
	reply.send('hello frontlive');
});
