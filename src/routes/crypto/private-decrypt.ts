import express, { Response, Request } from 'express';
import { BadRequestError } from '../../errors';
import { AuthenticatedMiddleware as requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/User';
import crypto from 'crypto';
import { currentUserRouter } from '../auth/current-user';

const router = express.Router();

router.post(
	'/',
	requireAuth,
	currentUserRouter,
	async (req: Request, res: Response) => {
		const { payload } = req.body;

		if (!payload) {
			const error = new BadRequestError(
				'Must provide valid plain text data to be encrypted'
			);

			return res.send(error.serializeErrors()).status(error.statusCode);
		}
		const currentUser = await User.findOne({
			phone: req.currentUser?.phone,
		});

		console.log(currentUser?.privateKey);
		const plainText = crypto.privateDecrypt(
			{
				key: Buffer.from(currentUser?.privateKey!),
				// In order to decrypt the data, we need to specify the
				// same hashing function and padding scheme that we used to
				// encrypt the data in the previous step
				padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
				oaepHash: 'sha512',
				passphrase: process.env.PASS_PHRASE!,
			},
			// Buffer.from(payload)
			payload
		);

		// The decrypted data is of the Buffer type, which we can convert to a
		// string to reveal the original data
		// console.log("decrypted data: ", plainText.toString())

		res.status(200).send(plainText.toString('base64'));
	}
);

export { router as decryptionRouter };
