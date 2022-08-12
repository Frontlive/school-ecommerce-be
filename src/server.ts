import fastify from 'fastify';

export const app = fastify({
  logger: true,
});

app.get('/', (_, reply) => {
  reply.send('hello frontlive');
});
