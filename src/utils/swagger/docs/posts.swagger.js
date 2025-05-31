/**
 * @openapi
 * /posts/encrypt:
 *   post:
 *     summary: Cria um post e retorna o conteúdo criptografado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authorId:
 *                 type: string
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *             required:
 *               - authorId
 *               - title
 *               - text
 *     responses:
 *       200:
 *         description: Conteúdo criptografado do post criado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 encryptedData:
 *                   type: string
 *                 key:
 *                   type: string
 *                 iv:
 *                   type: string
 *                 hmac:
 *                   type: string
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro no servidor
 *
 * /posts/decrypt:
 *   post:
 *     summary: Descriptografa os dados e retorna o post pelo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               encryptedData:
 *                 type: string
 *               key:
 *                 type: string
 *               iv:
 *                 type: string
 *               hmac:
 *                 type: string
 *             required:
 *               - encryptedData
 *               - key
 *               - iv
 *               - hmac
 *     responses:
 *       200:
 *         description: Post descriptografado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 authorId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 text:
 *                   type: string
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro na descriptografia
 */
module.exports = {};
