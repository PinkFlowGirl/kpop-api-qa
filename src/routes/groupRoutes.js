const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const groups = [
  {
    id: 1,
    name: 'BTS',
    debutYear: 2013,
    fandom: 'ARMY'
  },
  {
    id: 2,
    name: 'BLACKPINK',
    debutYear: 2016,
    fandom: 'BLINK'
  }
];

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
 *               debutYear:
 *                 type: integer
 *               fandom:
 *                 type: string
 *     responses:
 *       201:
 *         description: Grupo criado
 */
router.post('/groups', authMiddleware, (req, res) => {
 
  const { name, debutYear, fandom } = req.body;

    const newGroup = {
    id: groups.length + 1,
    name,
    debutYear,
    fandom
  };

  groups.push(newGroup);

  res.status(201).json(newGroup);
});


/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Lista todos os grupos de K-pop
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de grupos
 */
router.get('/groups', authMiddleware, (req, res) => {
  res.json(groups);
});


/**
 * @swagger
 * /api/groups/{id}:
 *   get:
 *     summary: Busca grupo por ID
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
router.get('/groups/:id', authMiddleware, (req, res) => {
  const group = groups.find(g => g.id == req.params.id);

  if (!group) {
    return res.status(404).json({ message: 'Grupo não encontrado' });
  }

  res.json(group);
});


module.exports = router;