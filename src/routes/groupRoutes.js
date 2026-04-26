const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const groupController = require('../controllers/groupController');

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Cria um novo grupo
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: NEW JEANS
 *               fandom:
 *                 type: string
 *                 example: Bunnies
 *               debutYear:
 *                 type: integer
 *                 example: 2022
 *     responses:
 *       201:
 *         description: Grupo criado com sucesso
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
 */
router.get('/groups', authMiddleware, groupController.getAllGroups);

/**
 * @swagger
 * /api/groups/{id}:
 *   get:
 *     summary: Busca um grupo por ID
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Grupo encontrado
 *       404:
 *         description: Grupo não encontrado
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
 *       - in: path
 *         name: id
 *         required: true
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
 *               fandom:
 *                 type: string
 *               debutYear:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Grupo atualizado
 *       404:
 *         description: Grupo não encontrado
 */
router.put('/groups/:id', authMiddleware, groupController.updateGroup);
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
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Grupo removido
 *       404:
 *         description: Grupo não encontrado
 */
router.delete('/groups/:id', authMiddleware, groupController.deleteGroup);
router.delete('/groups/:id', authMiddleware, groupController.deleteGroup);

module.exports = router;