const { encrypt, decrypt } = require('./crypto.js'); // ajuste o path se necessário

describe('Encrypt and Decrypt with AES-256-CTR and HMAC-SHA256', () => {
  it('should encrypt and decrypt text correctly', () => {
    const originalText = 'Texto confidencial para criptografia segura';
    const { encryptedData, key, iv, hmac } = encrypt(originalText);

    const decryptedText = decrypt(encryptedData, key, iv, hmac);

    expect(decryptedText).toBe(originalText);
  });

  it('should throw error if encryptedData is tampered', () => {
    const originalText = 'Teste de integridade';
    const { encryptedData, key, iv, hmac } = encrypt(originalText);

    // Altera 1 caractere do encryptedData (simulando ataque)
    const tamperedEncryptedData = encryptedData.slice(0, -1) + (encryptedData.slice(-1) === 'a' ? 'b' : 'a');

    expect(() => {
      decrypt(tamperedEncryptedData, key, iv, hmac);
    }).toThrow('Invalid HMAC - data may have been tampered with');
  });

  it('should throw error if IV is tampered', () => {
    const originalText = 'Outro teste';
    const { encryptedData, key, iv, hmac } = encrypt(originalText);

    const tamperedIV = iv.slice(0, -1) + (iv.slice(-1) === 'c' ? 'd' : 'c');

    expect(() => {
      decrypt(encryptedData, key, tamperedIV, hmac);
    }).toThrow('Invalid HMAC - data may have been tampered with');
  });

  it('should throw error if HMAC is tampered', () => {
    const originalText = 'Validação de integridade';
    const { encryptedData, key, iv, hmac } = encrypt(originalText);

    const tamperedHmac = hmac.slice(0, -1) + (hmac.slice(-1) === 'e' ? 'f' : 'e');

    expect(() => {
      decrypt(encryptedData, key, iv, tamperedHmac);
    }).toThrow('Invalid HMAC - data may have been tampered with');
  });
});
