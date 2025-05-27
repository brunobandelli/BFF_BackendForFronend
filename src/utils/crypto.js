const crypto = require('crypto');

const algorithm = 'aes-256-ctr';

function encrypt(text) {
  console.log('CRYPTO -  ENCRYPT ---- text: ', text)
  const iv = crypto.randomBytes(16);
  const key = crypto.randomBytes(32);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  console.log('CRYPTO -  ENCRYPT ---- encrypted: ', encrypted)

  return {
    encryptedData: encrypted.toString('hex'),
    key: key.toString('hex'),
    iv: iv.toString('hex'),
  };
}

function decrypt(encryptedData, keyHex, ivHex) {
  const key = Buffer.from(keyHex, 'hex');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, 'hex')),
    decipher.final(),
  ]);
  return decrypted.toString('utf8');
}

module.exports = {
  encrypt,
  decrypt,
};
