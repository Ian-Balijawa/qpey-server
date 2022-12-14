import express, { NextFunction, Request, Response } from 'express';
import { AuthenticatedMiddleware as requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.get(
	'/',
	requireAuth,
	async (req: Request, res: Response, next: NextFunction) => {
		res.end('data');
	}
);

export { router as verifyPhoneRouter };
