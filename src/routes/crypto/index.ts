// import express, { Request, Response } from 'express';
// import { User } from '../../models/User';
// import { BadRequestError } from '../../errors/bad-request-error';
// import { AuthenticatedMiddleware } from '../../middlewares';
// import NodeRSA from 'node-rsa';

// const DTest = express.Router();
// const ETest = express.Router();

// DTest.post(
// 	'/',
// 	AuthenticatedMiddleware,
// 	async (req: Request, res: Response) => {
// 		const { payload: data } = req.body;
// 		if (!data) {
// 			const error = new BadRequestError(
// 				'Must provide valid plain text data to be encrypted'
// 			);
// 			return res.send(error.serializeErrors()).status(error.statusCode);
// 		}

// 		const user = await User.findOne({ phone: req.currentUser?.phone });
// 		const RSA = new NodeRSA();

// 		const text = RSA.decryptStringWithRsaPrivateKey({
// 			text: data,
// 			privateKey: user?.privateKey,
// 		});
// 		console.log('DECRYPTED => ', text);
// 		res.status(200).send(text);
// 	}
// );

// ETest.post(
// 	'/',
// 	AuthenticatedMiddleware,
// 	async (req: Request, res: Response) => {
// 		const { payload: data } = req.body;
// 		if (!data) {
// 			const error = new BadRequestError(
// 				'Must provide valid plain text data to be encrypted'
// 			);
// 			return res.send(error.serializeErrors()).status(error.statusCode);
// 		}

// 		const user = await User.findOne({ phone: req.currentUser?.phone });

// 		const RSA = new NodeRSA();
// 		const text = RSA.encryptStringWithRsaPublicKey({
// 			text: data,
// 			publicKey: user?.publicKey,
// 		});
// 		console.log('ENCRYPTED => ', text);
// 		res.status(200).send(text);
// 	}
// );

// export { DTest, ETest };
