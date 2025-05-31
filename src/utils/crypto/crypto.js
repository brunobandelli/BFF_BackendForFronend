const crypto = require('crypto');

const algorithm = 'aes-256-ctr';

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const key = crypto.randomBytes(32);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);



// Protege tanto o IV quanto o encryptedData
// Verifica integridade dos dados com HMAC.
// Se o conteúdo foi alterado, lançamos um erro para prevenir ataques.
  const hmac = crypto
    .createHmac('sha256', key)
    .update(Buffer.concat([iv, encrypted]))
    .digest();

  return {
    encryptedData: encrypted.toString('hex'),
    key: key.toString('hex'),
    iv: iv.toString('hex'),
    hmac: hmac.toString('hex'),
  };
}
  
  // Observação:
  // AES-256-CTR garante confidencialidade, mas não integridade.
  // Por isso, usamos HMAC-SHA256 para garantir que os dados criptografados não foram alterados.
  // Se qualquer parte (texto criptografado, chave ou IV) for modificada, a verificação falha.

function decrypt(encryptedData, keyHex, ivHex, hmacHex) {
  const key = Buffer.from(keyHex, 'hex');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedBuffer = Buffer.from(encryptedData, 'hex');
  const hmacReceived = Buffer.from(hmacHex, 'hex');

  // Recalcula o HMAC usando IV + encryptedData
  const expectedHmac = crypto
    .createHmac('sha256', key)
    .update(Buffer.concat([iv, encryptedBuffer]))
    .digest();

  // Verifica se o HMAC é válido
  if (
    expectedHmac.length !== hmacReceived.length ||
    !crypto.timingSafeEqual(expectedHmac, hmacReceived)
  ) {
    throw new Error('Invalid HMAC - data may have been tampered with');
  }

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedBuffer),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
}

module.exports = { encrypt, decrypt };
