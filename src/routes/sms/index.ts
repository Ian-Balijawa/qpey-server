import express, { Request, Response } from 'express';
import { AuthenticatedMiddleware as requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.post('/', requireAuth, async (req: Request, res: Response) => {
	const { message, toNo } = req.body;

	res.send('msg');
});

export { router as smsRouter };
