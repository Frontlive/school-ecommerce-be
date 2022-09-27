import 'dotenv/config';
import { app } from './src/server';

const port = Number(process.env.PORT) || 4000;

const start = async () => {
	try {
		await app.listen({ port });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
void start();
