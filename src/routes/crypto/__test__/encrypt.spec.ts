import supertest from 'supertest';
import { app } from '../../../app';

declare global {
	namespace NodeJS {
		interface Global {
			signin(): string[];
		}
	}
}

it('should respond with a 401 unauthorised if user is not authenticated', async (): Promise<void> => {});
