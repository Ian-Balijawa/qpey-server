import express, { Response, Request } from 'express';
import { BadRequestError } from '../../errors';
import { AuthenticatedMiddleware as requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/User';
import crypto from 'crypto';
import { currentUserRouter } from '../auth/current-user';
import { NotAuthorizedError } from '../../errors/not-authorized-error';

const router = express.Router();

router.post(
	'/',
	requireAuth,
	currentUserRouter,
	async (req: Request, res: Response) => {
		const { payload: cipherText } = req.body;

		if (!cipherText) {
			const error = new BadRequestError(
				'Must provide valid plain text data to be encrypted'
			);

			return res.send(error.serializeErrors()).status(error.statusCode);
		}
		const currentUser = await User.findOne({
			phone: req.currentUser?.phone,
		});

		console.log(currentUser?.privateKey);
		if (!currentUser) {
			const error = new NotAuthorizedError(
				'not authorised. Need to sign in to access this route'
			);
			return res.status(error.statusCode).send(error.serializeErrors());
		}
		const plainText = crypto.privateDecrypt(
			{
				key: Buffer.from(currentUser?.privateKey!),
				padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
				oaepHash: 'sha512',
				passphrase: process.env.PASS_PHRASE!,
			},
			Buffer.from(cipherText, 'base64')
		);

		console.log('plainText: ', plainText);
		res.status(200).send(plainText.toString('utf8'));
	}
);

export { router as decryptionRouter };
