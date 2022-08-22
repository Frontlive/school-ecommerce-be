import { RouteHandler } from 'fastify';
import { CreateNewUserRoute } from './users.types';
import { isPrismaError } from '../db/db.utils';
import { PrismaErrorCode } from '../db/db.types';
import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 12;

export const createNewUserHandler: RouteHandler<CreateNewUserRoute> = async (request, reply) => {
	try {
		const { addNewUser } = request.server;
		const { username, password, email } = request.body;
		const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
		await addNewUser({ username, password: hashedPassword, email });
		reply.status(201).send({
			message: 'User successfully created!',
		});
	} catch (e: unknown) {
		if (isPrismaError(e) && e.code === PrismaErrorCode.UniqueKeyViolation) {
			reply.status(409).send({ message: 'Username or email already taken' });
		}
	}
};
