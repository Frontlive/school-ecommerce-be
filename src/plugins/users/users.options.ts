import { RouteShorthandOptions } from 'fastify';
import {
	newUserAlreadyExistsResponse,
	newUserBodySchema,
	newUserResponseSchema,
} from './users.schema';

export const createNewUserOpts: RouteShorthandOptions = {
	schema: {
		body: newUserBodySchema,
		response: {
			200: newUserResponseSchema,
			409: newUserAlreadyExistsResponse,
		},
	},
};
