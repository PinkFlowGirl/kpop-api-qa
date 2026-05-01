const express = require('express');
const router = express.Router({ strict: false });

const authMiddleware = require('../middlewares/authMiddleware');
const groupController = require('../controllers/groupController');

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: API de grupos de K-pop
 */

/**
 * @swagger
 * /groups:
 *   post:
 *     summary: Criar grupo
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupInput'
 *     responses:
 *       201:
 *         description: Grupo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *             example:
 *               ok: true
 *               message: Grupo criado com sucesso
 *               data:
 *                 id: 1
 *                 name: BLACKPINK
 *                 fandom: BLINK
 *                 members: ["Jisoo","Jennie","Rosé","Lisa"]
 *                 debutYear: 2016
 *                 generation: 3
 *       400:
 *         description: Erro de validação nos dados enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               ok: false
 *               message: Erro de validação nos dados enviados
 *       401:
 *         description: Usuário não autenticado ou token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               ok: false
 *               message: Token inválido ou ausente
 */
router.post('/', authMiddleware, groupController.createGroup);

/**
 * @swagger
 * /groups:
 *   get:
 *     summary: Lista todos os grupos
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de grupos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 *             example:
 *               ok: true
 *               message: Lista de grupos retornada com sucesso
 *               data: []
 *       401:
 *         description: Usuário não autenticado ou token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               ok: false
 *               message: Token inválido ou ausente
 */
router.get('/', authMiddleware, groupController.getAllGroups);

/**
 * @swagger
 * /groups/{id}:
 *   get:
 *     summary: Busca um grupo por ID
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do grupo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Grupo encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *             example:
 *               ok: true
 *               message: Grupo encontrado com sucesso
 *               data: {}
 *       401:
 *         description: Usuário não autenticado ou token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               ok: false
 *               message: Token inválido ou ausente
 *       404:
 *         description: Grupo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               ok: false
 *               message: Grupo não encontrado
 */
router.get('/:id', authMiddleware, groupController.getGroupById);

/**
 * @swagger
 * /groups/{id}:
 *   put:
 *     summary: Atualiza um grupo
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do grupo
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupInput'
 *     responses:
 *       200:
 *         description: Grupo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *             example:
 *               ok: true
 *               message: Grupo atualizado com sucesso
 *               data: {}
 *       400:
 *         description: Erro de validação nos dados enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               ok: false
 *               message: Erro de validação nos dados enviados
 *       401:
 *         description: Usuário não autenticado ou token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               ok: false
 *               message: Token inválido ou ausente
 *       404:
 *         description: Grupo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               ok: false
 *               message: Grupo não encontrado
 */
router.put('/:id', authMiddleware, groupController.updateGroup);

/**
 * @swagger
 * /groups/{id}:
 *   delete:
 *     summary: Remove um grupo
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do grupo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Grupo removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               ok: true
 *               message: Grupo removido com sucesso
 *       401:
 *         description: Usuário não autenticado ou token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               ok: false
 *               message: Token inválido ou ausente
 *       404:
 *         description: Grupo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               ok: false
 *               message: Grupo não encontrado
 */
router.delete('/:id', authMiddleware, groupController.deleteGroup);

module.exports = router;