const express = require('express');
const app = express();
const PostsController = require('./controllers/posts');
const { encrypt, decrypt } = require('./utils/crypto');
const { swaggerUi, swaggerSpec } = require('./utils/swagger/swaggerConfig');

app.use(express.json());

const postsController = new PostsController();

//ROTA DE CRIAÇÃO DE POSTS FUNCIONAIS COM O SERVIÇOS
app.post('/posts/encrypt', async (req, res) => {
  const { ...body } = req.body;

  if (!body) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const resultBody = await postsController.createPosts(body);
    const result = encrypt(JSON.stringify(resultBody));
    res.json(result);
  } catch (err) {
    const status = err.statusCode || 500;
    const message = `Encryption failed - ${err.message}` || 'Encryption failed';
    res.status(status).json({ error: message });
  }
});

//ROTA DE FETCH DE POSTS FUNCIONAIS COM O SERVIÇOS
app.post('/posts/decrypt', async (req, res) => {
  const { encryptedData, key, iv } = req.body;
  if (!encryptedData || !key || !iv) {
    return res.status(400).json({ error: 'encryptedData, key, and iv are required' });
  }

  try {
    const decryptedText = decrypt(encryptedData, key, iv);
    const bodyDecrypted = JSON.parse(decryptedText);
    const resultBody = await postsController.getPost(bodyDecrypted.id);
    res.json(resultBody);
  } catch (err) {
    res.status(500).json({ error: 'Decryption failed' });
  }
});

//ROTA SIMPLES DE CRIPTOGRAFIA SUGERIDA.
app.post('/encrypt', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const result = encrypt(text);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Encryption failed' });
  }
});

//ROTA SIMPLES DE DESCRIPTOGRAFIA SUGERIDA.
app.post('/decrypt', (req, res) => {
  const { encryptedData, key, iv } = req.body;
  if (!encryptedData || !key || !iv) {
    return res.status(400).json({ error: 'encryptedData, key, and iv are required' });
  }

  try {
    const decryptedText = decrypt(encryptedData, key, iv);
    res.json({ text: decryptedText });
  } catch (err) {
    res.status(500).json({ error: 'Decryption failed' });
  }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
});
