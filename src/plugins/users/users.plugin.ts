import { FastifyPluginAsync } from 'fastify';
import { createNewUserOpts } from './users.options';
import { createNewUserHandler } from './users.controller';
import { CreateNewUserRoute, UserRegisterInfo } from './users.types';
import { addNewUser } from './users.service';

declare module 'fastify' {
	interface FastifyInstance {
		addNewUser: (user: UserRegisterInfo) => Promise<void>;
	}
}

export const usersPlugin: FastifyPluginAsync = async (fastify) => {
	fastify.decorate('addNewUser', addNewUser(fastify.prisma));
	fastify.post<CreateNewUserRoute>('/', createNewUserOpts, createNewUserHandler);
};
