import { RouteHandler } from 'fastify';
import { CreateNewUserRoute } from './users.types';
import { isPrismaError } from '../db/db.utils';
import { PrismaErrorCode } from '../db/db.types';

export const createNewUserHandler: RouteHandler<CreateNewUserRoute> = async (request, reply) => {
	try {
		const { addNewUser } = request.server;
		const { username, password } = request.body;
		await addNewUser({ username, password });
	} catch (e: unknown) {
		if (isPrismaError(e) && e.code === PrismaErrorCode.ConstraintViolation) {
			reply.status(409).send({ message: 'Username or email already taken' });
		}
	}
};
