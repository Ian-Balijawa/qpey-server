import 'dotenv/config';
import express, { Express, NextFunction, Request, Response } from 'express';
import cookieSession from 'cookie-session';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { NotFoundError } from './errors';
import { CustomError } from './errors';
import { currentUserRouter } from './routes/auth/current-user';
import { signinRouter } from './routes/auth/signin';
import { signoutRouter } from './routes/auth/signout';
import { signupRouter } from './routes/auth/signup';
import { pingRouter } from './routes/home';
import { encryptionRouter } from './routes/crypto/encrypt';
import { decryptionRouter } from './routes/crypto/decrypt';
import { limiter as rateLimiter } from './middlewares';

const app: Express = express();

const apiPrefix = '/api/v1';

app.use(rateLimiter);
app.set('trust proxy', true);
app.disable('X-Powered-By');
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(
	cookieSession({
		secure: process.env.NODE_ENV === 'production',
		secret: process.env.COOKIE_SERCRET!,
		keys: [process.env.COOKIE_KEY!],
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`${apiPrefix}/auth/`, signupRouter);
app.use(`${apiPrefix}/auth/signin`, signinRouter);
app.use(`${apiPrefix}/auth/current-user`, currentUserRouter);
app.use(`${apiPrefix}/auth/signout`, signoutRouter);
app.use(`${apiPrefix}/encrypt`, encryptionRouter);
app.use(`${apiPrefix}/decrypt`, decryptionRouter);
app.use(`${apiPrefix}/ping`, pingRouter);

app.all('*', async (req: Request, res: Response) => {
	const error = new NotFoundError('Route to resource not Found');
	return res.status(error.statusCode).send(error.serializeErrors());
});

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
	if (err instanceof CustomError) {
		return res.status(err.statusCode).send(err.serializeErrors());
	}

	return res.status(500).send({
		errors: [
			{
				message:
					'Something went terribly wrong. Our Engineers are working hard to fix it.',
			},
		],
	});
});

export { app };
