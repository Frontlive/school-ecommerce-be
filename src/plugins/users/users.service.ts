import { UserRegisterInfo } from './users.types';
import { PrismaClient } from '@prisma/client';
export const addNewUser =
	(prisma: PrismaClient) =>
	async ({ username, password, email }: UserRegisterInfo) => {
		await prisma.user.create({
			data: {
				username,
				password,
				email,
			},
		});
	};
