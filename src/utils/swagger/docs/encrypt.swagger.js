/**
 * @openapi
 * /encrypt:
 *   post:
 *     summary: Criptografa um texto simples
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *             required:
 *               - text
 *     responses:
 *       200:
 *         description: Texto criptografado
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
 *         description: Erro na criptografia
 *
 * /decrypt:
 *   post:
 *     summary: Descriptografa um texto simples
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
 *         description: Texto descriptografado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro na descriptografia
 */
module.exports = {};
