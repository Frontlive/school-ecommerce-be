import { Prisma } from '@prisma/client';
import type { PrismaErrors } from './db.types';

export const isPrismaError = (err: unknown): err is PrismaErrors => {
	if (err && err instanceof Prisma.PrismaClientKnownRequestError) {
		return true;
	}
	return false;
};
