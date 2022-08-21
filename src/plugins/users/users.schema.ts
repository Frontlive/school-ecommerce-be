import { Static, Type } from '@sinclair/typebox';

export const newUserBodySchema = Type.Object({
	username: Type.String(),
	password: Type.String(),
	email: Type.String({ format: 'email' }),
});

export const newUserResponseSchema = Type.Object({
	message: Type.String(),
});

export const newUserAlreadyExistsResponse = Type.Object({
	message: Type.String(),
});

export type NewUserType = Static<typeof newUserBodySchema>;
