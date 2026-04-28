const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = "kpop-secret-key";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação da API
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login com sucesso
 *       401:
 *         description: Login inválido
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123") {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    return res.json({
      ok: true,
      token
    });
  }

  return res.status(401).json({
    ok: false,
    message: "Login inválido"
  });
});

module.exports = router;