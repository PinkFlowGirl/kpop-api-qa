const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "kpop-secret-key";

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autenticação da API
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login e retorna um token JWT
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Erro de validação nos dados enviados na requisição
 *       401:
 *         description: Usuário não autenticado
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  
  if (!username || !password) {
    return res.status(400).json({
      ok: false,
      message: 'Os campos "username" e "password" são obrigatórios'
    });
  }

 
  if (username === "admin" && password === "123") {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      ok: true,
      token
    });
  }

  return res.status(401).json({
    ok: false,
    message: "Token inválido"
  });
});

module.exports = router;