import crypto from "crypto";

const ALGORITHM = 'aes-256-cbc'; //Using AES encryption
const iv = crypto.randomBytes(16);

type PlainText = crypto.BinaryLike;
type CipherText = { iv: string; encryptedData: string; }

const SECRET_KEY = Buffer.alloc(32, process.env.ENCRYPTION_KEY,"utf-8")

//Encrypting text
export const encrypt = (text: PlainText):CipherText => {
   let cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);

   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text
export const decrypt = (text: CipherText) => {
   let iv = Buffer.from(text.iv, 'hex');
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   
   return decrypted.toString();
}
