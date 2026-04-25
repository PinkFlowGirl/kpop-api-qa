const express = require('express');
const router = express.Router();

const groupController = require('../controllers/groupController');

// Criar grupo
router.post('/groups', groupController.createGroup);

// (opcional) listar grupos
router.get('/groups', groupController.getAllGroups);

//
router.get('/groups/:id', groupController.getGroupById);

module.exports = router;