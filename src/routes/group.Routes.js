const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const groupController = require('../controllers/groupController');

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Criar grupo de K-pop
 *     tags: [Groups]
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
 *                 example: NEW JEANS
 *               debutYear:
 *                 type: number
 *                 example: 2022
 *               fandom:
 *                 type: string
 *                 example: Bunnies
 */
router.post('/groups', authMiddleware, groupController.createGroup);

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Lista grupos
 *     tags: [Groups]
 */
router.get('/groups', authMiddleware, groupController.getAllGroups);

/**
 * @swagger
 * /api/groups/{id}:
 *   get:
 *     summary: Busca grupo por ID
 *     tags: [Groups]
 */
router.get('/groups/:id', authMiddleware, groupController.getGroupById);

/**
 * @swagger
 * /api/groups/{id}:
 *   put:
 *     summary: Atualiza grupo
 *     tags: [Groups]
 */
router.put('/groups/:id', authMiddleware, groupController.updateGroup);

/**
 * @swagger
 * /api/groups/{id}:
 *   delete:
 *     summary: Remove grupo
 *     tags: [Groups]
 */
router.delete('/groups/:id', authMiddleware, groupController.deleteGroup);

module.exports = router;