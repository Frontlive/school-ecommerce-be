import { NewUserType } from './users.schema';

export type CreateNewUserRoute = {
	Body: NewUserType;
};

export type UserRegisterInfo = { username: string; password: string; email: string };
