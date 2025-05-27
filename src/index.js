const express = require('express');
const app = express();
const PostsController = require('./controllers/posts')
const { encrypt, decrypt } = require('./utils/crypto');

app.use(express.json());

const postsController = new PostsController()

// create post
app.post('/posts/encrypt', async (req, res) => {
  const { ...body } = req.body;

  console.log('INDEX --- body typeof: ', typeof body);
  console.log('INDEX --- body: ', body);

  if (!body) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const resultBody = await postsController.createPosts(body);
    console.log('INDEX --- resultBody: ', resultBody);

    const result = encrypt(JSON.stringify(resultBody));
    res.json(result);
  } catch (err) {
    const status = err.statusCode || 500;
    const message = `Encryption failed - ${err.message }` || 'Encryption failed';
    res.status(status).json({ error: message });
  }
});

//fetch post by id
app.post('/posts/decrypt/', async (req, res) => {
  const { encryptedData, key, iv } = req.body;
  if (!encryptedData || !key || !iv) {
    return res.status(400).json({ error: 'encryptedData, key, and iv are required' });
  }

  try {

    const decryptedText = decrypt(encryptedData, key, iv);
    const bodyDecrypted = JSON.parse(decryptedText)
    const resultBody = await postsController.getPost(bodyDecrypted.id)

    res.json(resultBody);
  } catch (err) {
    res.status(500).json({ error: 'Decryption failed' });
  }
});

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



// Inicie seu servidor normalmente abaixo:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
