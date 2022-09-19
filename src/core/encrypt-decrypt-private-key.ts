// import crypto from "crypto";

// const ALGORITHM = 'aes-256-cbc'; //Using AES encryption
// const iv = crypto.randomBytes(16);

// type PlainText = crypto.BinaryLike;
// type CipherText = { iv: string; encryptedData: string; }

// const SECRET_KEY = Buffer.alloc(32, process.env.ENCRYPTION_KEY,"utf-8")

// //Encrypting text
// export const encrypt = (text: PlainText):CipherText => {
//    let cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
//    let encrypted = cipher.update(text);
//    encrypted = Buffer.concat([encrypted, cipher.final()]);

//    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// }

// // Decrypting text
// export const decrypt = (text: CipherText) => {
//    let iv = Buffer.from(text.iv, 'hex');
//    let encryptedText = Buffer.from(text.encryptedData, 'hex');
//    let decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
//    let decrypted = decipher.update(encryptedText);
//    decrypted = Buffer.concat([decrypted, decipher.final()]);

//    return decrypted.toString();
// }

import {
	createPublicKey,
	createPrivateKey,
	privateDecrypt,
	publicEncrypt,
} from 'crypto';

const privateKeyPem = process.env.ENCRYPTION_PRIVATE_KEY!;
// const privateKeyPemFixed = privateKeyPem.replace(/\\n/g, '\n');
const privateKeyPemFixed = privateKeyPem;
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
