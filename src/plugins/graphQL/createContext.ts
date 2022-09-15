import { YogaInitialContext } from '@graphql-yoga/node';
import { PrismaClient } from '@prisma/client';
import type { FastifyReply, FastifyRequest } from 'fastify';

const prisma = new PrismaClient();

export type FastifyContext = {
	req: FastifyRequest;
	reply: FastifyReply;
};

export type UserContext = {
	prisma: PrismaClient;
};

export type CombinedFastifyYogaContext = FastifyContext & YogaInitialContext;
export type Context = CombinedFastifyYogaContext & UserContext;

export const createContext = (initialContext: CombinedFastifyYogaContext): Context => {
	return {
		...initialContext,
		prisma,
	};
};
