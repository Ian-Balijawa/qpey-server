import {
	createPublicKey,
	createPrivateKey,
	privateDecrypt,
	publicEncrypt,
} from 'crypto';

const privateKeyPem = process.env.ENCRYPTION_PRIVATE_KEY!;
const privateKeyPemFixed = privateKeyPem.replace(/\\n/g, '\n');
const privateKey = createPrivateKey(privateKeyPemFixed);
const publicKey = createPublicKey(privateKey);

export const encrypt = (text: string): string => {
	const buffer = Buffer.from(text, 'utf8');
	const encrypted = publicEncrypt(publicKey, buffer);
	return encrypted.toString('base64');
};

export const decrypt = (cipher: string): string => {
	const buffer = Buffer.from(cipher, 'base64');
	const decrypted = privateDecrypt(privateKey, buffer);
	return decrypted.toString('utf8');
};
