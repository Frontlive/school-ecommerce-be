import { FastifyPluginAsync } from 'fastify';
import { createNewUserOpts } from './users.options';
import { createNewUserHandler } from './users.controller';
import { CreateNewUserRoute } from './users.types';
import { addNewUser } from './users.service';

declare module 'fastify' {
	interface FastifyInstance {
		addNewUser: (user: { username: string; password: string }) => Promise<void>;
	}
}

export const usersPlugin: FastifyPluginAsync = async (fastify) => {
	fastify.decorate('addNewUser', addNewUser(fastify));
	fastify.post<CreateNewUserRoute>('/', createNewUserOpts, createNewUserHandler);
};
