const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const groupController = require('../controllers/groupController');

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Cria um novo grupo de K-pop
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - debutYear
 *               - fandom
 *             properties:
 *               name:
 *                 type: string
 *                 example: IVE
 *               debutYear:
 *                 type: integer
 *                 example: 2021
 *               fandom:
 *                 type: string
 *                 example: DIVE
 *     responses:
 *       201:
 *         description: Grupo criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post('/groups', authMiddleware, groupController.createGroup);

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Lista todos os grupos
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de grupos
 *       401:
 *         description: Não autorizado
 */
router.get('/groups', authMiddleware, groupController.getAllGroups);

/**
 * @swagger
 * /api/groups/{id}:
 *   get:
 *     summary: Busca grupo por ID
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
 *         description: Grupo encontrado
 *       404:
 *         description: Grupo não encontrado
 *       401:
 *         description: Não autorizado
 */
router.get('/groups/:id', authMiddleware, groupController.getGroupById);

/**
 * @swagger
 * /api/groups/{id}:
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: IVE
 *               debutYear:
 *                 type: integer
 *                 example: 2021
 *               fandom:
 *                 type: string
 *                 example: DIVE UPDATED
 *     responses:
 *       200:
 *         description: Grupo atualizado
 *       404:
 *         description: Grupo não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put('/groups/:id', authMiddleware, groupController.updateGroup);

/**
 * @swagger
 * /api/groups/{id}:
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
 *         description: Grupo removido
 *       404:
 *         description: Grupo não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete('/groups/:id', authMiddleware, groupController.deleteGroup);

module.exports = router;